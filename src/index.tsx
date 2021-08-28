import api, { route } from '@forge/api'
import ForgeUI, {
  render,
  Fragment,
  Button,
  Text,
  Macro,
  useProductContext,
  useState,
} from '@forge/ui'
import { fetch } from '@forge/api'

const postData = (url: string, data: string) => {
  // Default options are marked with *
  return fetch(url, {
    body: data, // must match 'Content-Type' header
    headers: {
      Authorization:
      'Bearer sl.ho36tpauLbzXOXVts-lzgvyoGnD8hADfTXEaqDqt8AkzXO634xgGeIm4YluT7EGL0gOuVFmZWT1upWpY8ZbIvFPMGn5A5l0EqNJ3q5r6OZKi9dxWf9A',
      'Dropbox-API-Arg': '{"path": "/Homework/math/test.txt"}',
      'Content-Type': 'application/octet-stream',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    redirect: 'follow', // manual, *follow, error
  }).then((response) => response.json()) // 輸出成 json
}

const fetchCommentsForContent = async (contentId) => {
  const res = await api
    .asUser()
    .requestConfluence(route`/rest/api/content/${contentId}/child/comment`)

  const data = await res.json()
  return data.results
}

const App = () => {
  const fetchPOSTcontent = async () => {
    postData('https://content.dropboxapi.com/2/files/upload', `{answer: 42}`)
      .then((data) => console.log(data)) // JSON from `response.json()` call
      .catch((error) => console.error(error))
  }

  const [count, setCount] = useState(0)
  const context = useProductContext()
  const [comments] = useState(
    async () => await fetchCommentsForContent(context.contentId),
  )

  console.log(
    `Number of comments on this page: ${
      comments !== undefined ? comments.length : 0
    }`,
  )

  return (
    <Fragment>
      <Button
        text={`${count}`}
        onClick={() => {
          setCount(count + 1)
          fetchPOSTcontent()
        }}
      />
      <Text>Hello test!</Text>
    </Fragment>
  )
}

export const run = render(<Macro app={<App />} />)
