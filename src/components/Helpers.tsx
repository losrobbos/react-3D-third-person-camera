export const Helpers = ({ visible = false }: { visible?: boolean }) => {

  if(!visible) return null;

  return <>
    <axesHelper args={[5]} />
    <gridHelper args={[8, 8, 8]} />
  </>

}