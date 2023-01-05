module ItemsHelper
  def upload_to_ipfs(filepath, content_type = "image/jpeg")
    uri = URI.parse("https://api.pinata.cloud/pinning/pinFileToIPFS")
    boundary = "AaB03x"
    post_body = []
    # Add the file Data
    post_body << "--#{boundary}\r\n"
    post_body << "Content-Disposition: form-data; name=\"file\"; filename=\"#{File.basename(filepath)}\"\r\n"
    post_body << "Content-Type: #{content_type}\r\n\r\n"
    post_body << File.read(filepath)
    post_body << "\r\n\r\n--#{boundary}--\r\n"

    # Create the HTTP objects
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.request_uri)
    request["content-type"] = "multipart/form-data; boundary=#{boundary}"
    request["pinata_api_key"] = ENV["PINATA_API_KEY"]
    request["pinata_secret_api_key"] = ENV["PINATA_API_SECRET"]
    request.body = post_body.join

    # Send the request
    response = http.request(request)

    # Return format:
    #  {"IpfsHash"=>"Qmdre2AnZ5NXoFmrVtk94DA7s56wH3nhNospwW3yneEwpU",
    #  "PinSize"=>10252,
    #  "Timestamp"=>"2022-08-16T16:25:47.837Z"}
    JSON.parse(response.body)
  end

  def ipfs_url_from(
    hash,
    gateway = ENV["PINATA_IPFS_GATEWAY"],
    protocol = "ipfs://"
  )
    # gateway = "https://ipfs.io/ipfs/"
    # gateway = "https://cloudflare-ipfs.com/ipfs/"
    { protocol: "#{protocol}#{hash}", gateway: "#{gateway}#{hash}" }
  end

  # def update_addresses
  #   addresses = {
  #     "0x9d2d0aa5e8a365b07c113f45b05bac8a0b27a102" => %w[
  #       QmU1peZ3DeuXkAkVADwwygtr7mGe8iBe3X879gG5GAa38T
  #       QmQxS99FXkBjynAyZWLo6JMVZXrkwTU6iTr7GVbbwgBRqS
  #       QmRn7CfvjDTyLwNBGX11Z9VofMAxgBHwEU7yrL9L3VkNHQ
  #       QmZ2wLXveNUWvjkNrH36ZVFivMcSQuydMUFN9GKZeZxzpD
  #       QmdbVSKkYTTFv3VfAEUS5Jj677GgW3mZpm97rcUcvkB4h5
  #       QmceCaEAQDtjpax4mx4kK1kuva95Wsvmtw8VQXYFSxARtx
  #       QmYnac1Rh6y2kYr98LSBgkgcQgsByVwnScBiCKtMCb2uxw
  #       QmZZJ5YgFnDnSovfRukS3rxXTA3hdXTAavYQZ4uJEMFiCV
  #       QmPpo3Y16EGTSZtB7ifzVUeeyksNrmkfzQBqCfxorr2WnJ
  #       QmUJw6ahFPNTVru5xfNSwWatdHrMYzkUWM8LUgv9tLr6aK
  #       QmVVs9rPhMreKDf6fmeEp8BNhfQra89aKywz3MtLNUe6zS
  #       QmXU27dDFdFVfyAzhrb6NLMFTinYgPSeiTM97h72YnoS7Y
  #       QmQ1JHYK2FGEc1oeYZR9CixDEJDQ8me7gET2foamX1yhbW
  #       QmWpPhdXodZCfGwcs5AuVrknxc1WQ36t19QMa4ofBoLLQ6
  #       QmanH9L6DEx4Q5s7uLU4opNLcAezYmzoj2Bjt1U3uCkC4v
  #       QmUsvvERebb3LkDouK3gAoEWn5jDbf2PsW9VTgBayMDnsz
  #       QmemY1uPVzehhdR9AA2tx35mqWJeKgV9QDo897KBaseWjb
  #       QmPjxY3H6bDgrVL5cAfWT1VpxqsSGen2iaFpjTen5wqfvg
  #       QmRTJShczs1QBeW1Wu1Nk2XLKTDXKjM3wzgyJA6nwDoVCj
  #       QmayqvryZHG4jF2W4Uczsa5LwB3mDhMRtf1fQJcB8XZpRA
  #       QmXysaCNsq3pnMhPDsaz314shSbB68gGee3h3SGj3Mx9zE
  #       QmezdVMmKy4GqNXkTLZjAcxVQ5r7XyNpWFNYeBSJGE2m7U
  #       QmQPTGbfCuJRuuexYEH4HLcjza6a5pesaeRCTyC2NArD2e
  #       QmTtTB5McRfTsRMpRG6m2sgwjgHCUwnhGSzPt3Yv9MNbwP
  #     ],
  #     "0xe5bb8dbad20e2423eb5ad19e7b95d05d981da5c6" => %w[
  #       QmNjRQXAnxnCCRpr2UJq1ZJFMwFN2Rk1sVSVNd8LobA1ya
  #       QmWgGPNWE3j6u5ge9iwnRaqZbRASCiZD4HLAbqD1onbJcD
  #       QmZBGq4V5XpAq7CXgom3Evoakv49nDpJomcGykaGrjr1gh
  #       QmeZiwZZC3hcJRMopsQZfMm5uCgFJ13ahHJMoaLk3eYbcM
  #       QmQtZNMQhdQHhnJ8V4QVwLYbTKxcKUbDVmAV9MnNU1eYKs
  #       QmcHftamXt7NymQgKEMtsjCPUDpKGDspTJKtQHpepqpziy
  #     ],
  #     "0x1848f4d01ebe4a017dc2de7c37f9b9f800cfbfd4" => %w[
  #       QmQuEwpwQ8NvbcA6FPMru4u9uBfGfEzMxvA6gHz9YCar7h
  #       QmWScRmVm3mD7Cd6JkF7d3PiKpjbjrBTQYJ9CgjaHsn4GY
  #       QmczYE9Rs41m4HRAiDtSKnVpeDBMC6JAwA8QVf6Gtr1TxH
  #       QmNve3SAuqAFEiMhs3q7NttAbTTEsskHR67oZ1DG9H4XES
  #     ],
  #     "0xbdb580a64ec2d08c882acba65c42daba4f212626" => [
  #       "QmZSgkJjc5D8gUZQXaVvBgbtWpccohAcFchH8dPH8sVv6r"
  #     ]
  #   }

  #   addresses.each do |address, ipfs_hashes|
  #     ipfs_hashes.each do |ipfs_hash|
  #       item = Item.find_by(metadata_ipfs_hash: ipfs_hash)
  #       item.update(contract_address: address) if item
  #     end
  #   end
  # end

  # def update_name_and_img_url
  #   Item.all.each do |item|
  #     ipfs_url = ipfs_url_from(item.metadata_ipfs_hash)[:gateway]
  #     response = get_ipfs_content(ipfs_url)
  #     item.update!(name: response["name"], image_url: response["image"])
  #   end
  # end

  def add_youtube_urls
    values = [
      ["Feel Good Inc", "ZxVw7bvMd3s"],
      ["Fire Coming out of the Monkey's Head", "LtQHIv2O8x0"],
      %w[Lithium pkcJEvMcnEg],
      ["All along the watchtower", "bT7Hj-ea0VE"],
      ["Purple Haze", "WGoDaYjdfSg"],
      ["Feeling good", "oHRNrgDIJfo"],
      ["Purple Haze", "WGoDaYjdfSg"],
      ["Purple Haze", "WGoDaYjdfSg"],
      ["Purple Haze", "WGoDaYjdfSg"],
      ["Purple Haze", "WGoDaYjdfSg"],
      ["Purple Haze", "WGoDaYjdfSg"],
      ["Norwegian Wood", "Y_V6y1ZCg_8"],
      ["Love me do", "0pGOFX1D_jg"],
      ["Rhinestone eyes", "7GdsftXc0yU"],
      ["All along the watchtower", "TLV4_xaYynY"],
      ["Yellow Submarine", "m2uTFF_3MaA"],
      %w[5 O8VQdZaQ5fg]
    ]
    for pair in values
      item = Item.find_by(name: (pair[0] + " #1"))
      item.update(youtube_url: pair[1]) if item
    end
  end

  def get_ipfs_content(url)
    uri = URI.parse(url)
    if uri.host && uri.port
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      request = Net::HTTP::Get.new(uri.request_uri)
      http.request(request).body
    end
    # response = http.request(request)
    # JSON.parse(response.body)
  end
end

def change_img_url(to: target_gateway)
  Item.all.each do |item|
    unless item.image_url.nil?
      item.update! image_url:
                     item
                       &.image_url
                       &.gsub("https://ipfs.io/ipfs/", to)
                       &.gsub("https://ipfs.infura.io/ipfs/", to)
                       &.gsub("https://cloudflare-ipfs.com/ipfs/", to)
                       &.gsub("https://toeinriver.mypinata.cloud/ipfs/", to)
    end
  end
end

# def assign_user_to_role(user_id, role_id)
#   role_id = "1013283386871259156"
#   user_id = "483926926717616128"
#   Discordrb::API::Server.add_member_role(
#     "Bot #{ENV["DISCORD_BOT_TOKEN"]}",
#     ENV["DISCORD_SERVER_ID"],
#     user_id,
#     role_id,
#     "verified"
#   )
# end

def create_new_role(role_name)
  Discordrb::Server.create_role(name: role_name)
end

def add_user_to_channel(user_id, channel_id)
  server = Discord_bot.server(ENV["DISCORD_SERVER_ID"])
  channel = server.instance_values["channels_by_id"][channel_id.to_i]
  allow = Discordrb::Permissions.new
  allow.can_read_messages = true
  allow.can_send_messages = true
  allow.can_embed_links = true
  allow.can_attach_files = true
  allow.can_read_message_history = true
  allow.can_use_external_emoji = true
  allow.can_add_reactions = true
  channel.define_overwrite(server.member(user_id), allow) if channel
end
