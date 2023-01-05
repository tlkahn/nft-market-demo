module ApplicationHelper
  include Pagy::Frontend

  def img_gen
    "https://picsum.photos/id/#{rand(1..100)}/300/300"
  end

  def footer_data
    {
      "Explorer" => [
        "Live Auctions",
        "Latest Drops",
        "Premiere Club",
        "All NFTs"
      ],
      "Resources" => [
        "FAQ",
        "Terms of Service",
        "Privacy Policy",
        "Careers",
        "Support"
      ],
      "Doc" => [
        "API",
        "Developer Guide",
        "User Guide",
        "Authentication Guide",
        "Roadmap"
      ],
      "Community" => %w[Discord Twitter Github Medium]
    }
  end

  def define_footer_vars
    @footer_data = footer_data
  end

  def random_bytes(length)
    SecureRandom.hex(length)
  end

  def random_text(max_length)
    SecureRandom.alphanumeric(max_length)
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def truncate(string, max)
    string.length > max ? "#{string[0...max]}..." : string
  end

  # def all_categories
  #   Category.all
  # end
end
