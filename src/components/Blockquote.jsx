import { withGitHubAlert } from 'nextra/components'
 
const Blockquote = withGitHubAlert(({ type, ...props }) => {
  return <MyCalloutComponent type={type} {...props} />
}, MyBlockquoteComponent)

export function useMDXComponents(components) {
  return {
    blockquote: Blockquote,
    ...components
  }
}