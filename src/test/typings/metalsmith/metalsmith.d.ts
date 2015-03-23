
declare class Metalsmith {
  constructor(directory: string);

  ware: any;

  directory(dir?: string): string;
  source(src?: string): string;
  destination(dest?: string): string;
  clean(flag?: boolean): boolean;
  frontmatter(flag?: boolean): boolean;

  use(plugin: (files: Object, metalsmith: Metalsmith, done) => any): Metalsmith;
  build(callback?: any): any;
}

declare module "metalsmith" {
  export = Metalsmith;
}
