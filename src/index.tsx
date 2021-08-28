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

const postData =  async (url: string, data: string) => {
  // Default options are marked with *
  const res = await fetch(url, {
    body: data, // must match 'Content-Type' header
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    redirect: 'follow', // manual, *follow, error
  })
  return res.json()
}

const fetchCommentsForContent = async (contentId) => {
  const response = await api.asApp().requestConfluence(route`/wiki/rest/api/space`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
  const data = await response.json()
  return data.results
}
const fetchPOSTcontent = async () => {
  const data = await postData('https://feb2-51-15-52-186.ngrok.io', '{"age23": 42}')
  return JSON.stringify(data)
}

const App = () => {

  const [count] = useState(async () => await fetchPOSTcontent(),)
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
      <Button text={comments[0].name} onClick={() => {}} />
      <Text>{count}</Text>
    </Fragment>
  )
}

export const run = render(<Macro app={<App />} />)
