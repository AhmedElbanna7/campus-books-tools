function ExtractCloudinaryPublicId(url) {
  const afterUpload = url.split('/upload/')[1];
  if (!afterUpload) return null;

  const withoutVersion = afterUpload.replace(/^v\d+\//, '');
  const publicId = withoutVersion.replace(/\.[a-zA-Z0-9]+$/, '');

  return publicId;
}

module.exports = ExtractCloudinaryPublicId;
