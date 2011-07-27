class User < ActiveRecord::Base
  validates :name, :presence => true
  validates :provider, :presence => true
  validates :uid, :uniqueness => {:scope => :provider}, :presence => true

  def self.find_or_create(data)
    user = where("provider = ? AND uid = ?", data["provider"], data["uid"]).first 
    user ||= create(:provider => data["provider"], :uid => data["uid"], :name => data["name"]["full_name"])
  end
end
