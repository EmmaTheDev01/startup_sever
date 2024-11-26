import exiftool from 'exiftool-vendored';

export const scanMetadata = async (req, res) => {
  const { filePath } = req.body;

  try {
    const metadata = await exiftool.read(filePath); // Reading metadata from the file
    res.status(200).json({
      success: true,
      message: 'Metadata scan completed',
      data: metadata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing metadata scan',
    });
  }
};
