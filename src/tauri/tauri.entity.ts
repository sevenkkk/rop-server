export class TauriSigReqDto {
  project: string;
  branch: string;
  platform: 'Android' | 'IOS' | 'Windows' | 'MacOS' | 'H5';
  arch: string;
  version: string;
}

export class TauriSigResDto {
  version: string;
  pub_date: string;
  url: string;
  signature: string;
  notes: string;

  constructor(
    version: string,
    pub_date: string,
    url: string,
    signature: string,
    notes: string,
  ) {
    this.version = version;
    this.pub_date = pub_date;
    this.url = url;
    this.signature = signature;
    this.notes = notes;
  }
}
