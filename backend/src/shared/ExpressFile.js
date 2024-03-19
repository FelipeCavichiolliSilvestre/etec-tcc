class ExpressFile {
  constructor(readableStream, extension) {
    this.readableStream = readableStream;
    this.extension = extension;
  }

  pipeToRes(res) {
    res.setHeader("content-type", "text/" + this.extension);
    this.readableStream.pipe(res);
  }
}

module.exports = { ExpressFile };
