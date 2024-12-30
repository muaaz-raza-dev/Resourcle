import GetResourceCollectionsApi from '@/api/resource-collection/get-resoruce-collections.api';
import { authAtom } from '@/state/auth.atom';
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil';
import useGetUserProfileInfomartion from '../user-profile/useGetUserInfomartion';

export default function useGetResourceCollections(payload?:{enabled?:boolean}) {
    const {data} = useGetUserProfileInfomartion({hitApi:false})
    const {user,isLogined} = useRecoilValue(authAtom)
  return (
    useQuery({
        queryKey: ["Resource Collections", user?._id||""],
        enabled: payload?.enabled ? true : (( isLogined &&  user?._id == data?.payload._id )|| false),
        queryFn: GetResourceCollectionsApi
    })
  )
}
