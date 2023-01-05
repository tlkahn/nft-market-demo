class SessionsController < ApplicationController
  include SessionsHelper
  def new
    session[:random_text] = @random_text = random_text(32)
  end

  def create
    random_text_param = params[:random_text]
    wallet_address_param = params[:wallet_address]
    signature_param = params[:signature]
    chain_id = params[:chain_id].hex
    if random_text_param != session[:random_text]
      render json: {
               message: "400",
               error: "Invalid random text"
             }, status: :bad_request
    end
    address = Eth::Address.new(wallet_address_param)
    signature = signature_param[2..]
    if Eth::Signature.verify(random_text_param, signature, address, chain_id)
      create_session(wallet_address_param)
    else
      render json: {
               message: "401",
               error: "Invalid signature"
             }, status: :not_found
    end
  end

  def destroy
    sign_out
    redirect_to root_url, notice: "You have successfully signed out."
  end

  private

  def set_session_for_user(user)
    sign_in(user)
    render json: {
             status_code: "200",
             message: "success",
           }, status: :created
  end

  def create_session(address)
    user = User.find_by_eth_address(address)
    if user
      set_session_for_user(user)
    else
      create_user(address)
    end
  end

  def create_user(address)
    user = User.new(eth_address: address)
    if user.save
      set_session_for_user(user)
    else
      render json: {
               message: "500",
               error: user.errors.full_messages
             }, status: :internal_server_error
    end
  end
end
