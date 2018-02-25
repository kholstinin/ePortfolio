// declare module 'directory-tree' {
//   declare module.exports: any,
// }

declare type dirTree = {
  children?: Array<?dirTree>,
  name: string,
  path: string,
  size: number,
  type: dirTreeTypes,
  extension?: string,
}

type dirTreeTypes = 'directory' | 'file';