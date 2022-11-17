// 获取当前目录里所有以 .svg 结尾的文件

// 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。
// 如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以传入 { eager: true }
// const context = import.meta.glob('./icon/*.svg', { eager: false })
// console.log(context)
// // 解析获取的 .svg 文件的文件名称，并返回

// const requireAll = (requireContext: any) => {
//   console.log(requireContext)
//   console.log(Object.keys(requireContext))
//   Object.keys(requireContext).forEach(key => {
//     console.log(key)
//   })

//   // return requireContext
//   return requireContext
//   // return requireContext.keys().map(requireContext)
// }
// requireAll(context)

// export { }
