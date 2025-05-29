import Template from '@/components/design-templates'

const Templates = ({ theme }) => {
  return (
    <div>
      <Template
        theme={theme}
        variant="full"
        // maxTemplates={999}
        showHeader={true}
      />
    </div>
  )
}

export default Templates