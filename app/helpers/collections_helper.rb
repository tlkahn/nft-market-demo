module CollectionsHelper
  def upload_to_aws(file)
    Aws.config.update(
      region: config[:region],
      credentials: config[:credentials]
    )
    s3 = Aws::S3::Resource.new
    obj = s3.bucket("metart-collection-images").object(file.original_filename)
    obj.upload_file(
      file.tempfile.path,
      acl: "public-read",
      content_type: file.content_type
    )
    obj.public_url
  end

  def config
    {
      region: Rails.application.credentials.dig(:aws, :region),
      credentials:
        Aws::Credentials.new(
          Rails.application.credentials.dig(:aws, :aws_access_key_id),
          Rails.application.credentials.dig(:aws, :aws_secret_access_key)
        )
    }
  end

  def load_storage_config
    # YAML.load_file("#{Rails.root.to_s}/config/storage.yml")["amazon"]
  end

  def create_new_discord_channel(
    channel_name,
    topic = "Everything about #{channel_name}",
    private = true,
    parent_id = ENV["DISCORD_TEXT_CATEGORY_ID"]
  )
    server = Discord_bot.server(ENV["DISCORD_SERVER_ID"])
    channel = server.create_channel(channel_name, 0, topic: topic)
    channel.category = parent_id if parent_id

    if channel && private
      deny = Discordrb::Permissions.new
      deny.can_read_messages = true
      channel.define_overwrite(server.everyone_role, 0, deny)
      channel
    end
  end
end
