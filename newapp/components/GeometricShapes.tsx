export function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -left-10 top-20 w-40 h-40 bg-purple-500/10 rotate-45" />
      <div className="absolute -left-20 top-40 w-40 h-40 bg-purple-500/5 rotate-45" />
      
      <div className="absolute right-[10%] top-[20%] w-60 h-60 bg-purple-500/10 rotate-45" />
      <div className="absolute right-[5%] top-[25%] w-60 h-60 bg-purple-500/5 rotate-45" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  )
}

