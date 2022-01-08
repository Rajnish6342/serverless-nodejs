module.exports.health = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Lambda function is running!',
    })
  }
}