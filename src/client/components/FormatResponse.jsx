import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdownComponents = {
  p: (props) => <p className="my-4 leading-relaxed" {...props} />,
  h1: (props) => <h1 className="text-3xl font-bold my-6" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold my-5" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold my-4" {...props} />,
  h4: (props) => <h4 className="text-lg font-semibold my-3" {...props} />,
  h5: (props) => <h5 className="text-base font-semibold my-2" {...props} />,
  h6: (props) => <h6 className="text-sm font-semibold my-1" {...props} />,
  ul: (props) => <ul className="list-disc list-inside my-4" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside my-4" {...props} />,
  li: (props) => <li className="mb-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props} />
  ),
  code: ({ inline, className, children, ...props }) =>
    inline ? (
      <code className="bg-gray-200 rounded px-1 py-0.5 text-sm font-mono" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-gray-800 text-white rounded p-4 overflow-auto my-4">
        <code className={className} {...props}>{children}</code>
      </pre>
    ),
  hr: (props) => <hr className="my-6 border-gray-300" {...props} />,
  a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
  img: ({ alt, ...props }) => <img className="max-w-full rounded my-4" alt={alt} {...props} />,
}

const FormattedResponse = ({ content }) => (
  <div className="prose">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  </div>
)

export default FormattedResponse
