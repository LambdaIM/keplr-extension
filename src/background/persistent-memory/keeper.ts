export class PersistentMemoryKeeper {
  data: any = {};

  set(data: any) {
    this.data = { ...this.data, ...data };
  }

  get(): any {
    console.log('getdata',this.data)
    return this.data;
  }
  getChainId(): any {
    return this.data['lastViewChainId']||null;
  }
}
