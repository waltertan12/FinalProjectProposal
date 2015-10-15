json.extract!(
  @user,
  :id,
  :username,
  :email,
  :image_url,
  :created_at,
  :updated_at
)

json.tracks @user.tracks
if current_user
  json.is_current_user_following current_user.following?(@user)
else
  json.is_current_user_following false
end
json.followers @user.followers
json.followed  @user.following