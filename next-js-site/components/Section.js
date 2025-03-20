export default function Section({ title, darkBg, children, centerContent, ...others }) {
  return (
    <div className={`flex flex-col items-center py-14 ${darkBg ? 'bg-gray-100' : ''}`} {...others}>
      <div className={`w-4/5 flex flex-col ${centerContent && 'items-center'}`}>
      <h1>{title}</h1>
      {children}
      </div>
    </div>
  )
}