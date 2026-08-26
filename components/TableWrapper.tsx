const TableWrapper = ({ children }) => {
  return (
    <div className="border-line my-6 w-full overflow-x-auto rounded border">
      <table className="my-0 w-full">{children}</table>
    </div>
  )
}

export default TableWrapper
