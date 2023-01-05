class ApplicationController < ActionController::Base
  include Pagy::Backend
  include ApplicationHelper
  before_action :define_footer_vars
end
