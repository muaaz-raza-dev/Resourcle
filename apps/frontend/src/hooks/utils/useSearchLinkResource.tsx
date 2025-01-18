import { ResourceFilterLinksAtom } from '@/state/resource-link-searchbar.atom'
import { useRecoilState } from 'recoil'

export default function useSearchLinkResource  () {
  const [state,setState] = useRecoilState(ResourceFilterLinksAtom)
  function Search(query:string) {
    if(query.length === 0) {
      setState({...state,filtered:state.original})
    } 
    else {
      const filtered = state.original.map((item) => { 
        const links = item.links.filter((link) => (link.title+link.url).toLowerCase().includes(query.toLowerCase()))
        if(links.length ==0) {
          return null
        }
        return  {...item,links}
      })
      setState({...state,filtered:filtered.filter((item) => item!=null)})
    }

  }
  return Search
}
