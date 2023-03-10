export default function CustomBadge(props: {percentage: string}){
  const isDecrease = props.percentage.includes('-')
  return (
    <div 
      className="flex text-xs font-medium mr-2 px-3 py-0.5 rounded-full"
      style={{
        backgroundColor: isDecrease ? '#E9AFAB' : '#C9E7CA',
        color: isDecrease ? 'red' : 'green'
      }}>
      {isDecrease ?
        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.34319 6.34313C6.73371 5.9526 7.36688 5.9526 7.7574 6.34313L15.9645 14.5502V8.44973C15.9645 7.89744 16.4122 7.44973 16.9645 7.44973C17.5168 7.44973 17.9645 7.89744 17.9645 8.44973V16.9497C17.9645 17.502 17.5168 17.9497 16.9645 17.9497H16.9505C16.95 17.9497 16.9496 17.9497 16.9491 17.9497H8.46451C7.91222 17.9497 7.46451 17.502 7.46451 16.9497C7.46451 16.3974 7.91222 15.9497 8.46451 15.9497H14.5356L6.34319 7.75734C5.95266 7.36681 5.95266 6.73365 6.34319 6.34313Z" fill="#E52929"/>
        </svg>
        :
        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.46451 7.05023C7.46451 6.49795 7.91222 6.05023 8.46451 6.05023H16.9496C16.9497 6.05023 16.9498 6.05023 16.95 6.05023H16.9645C17.5168 6.05023 17.9645 6.49795 17.9645 7.05023V15.5502C17.9645 16.1025 17.5168 16.5502 16.9645 16.5502C16.4122 16.5502 15.9645 16.1025 15.9645 15.5502V9.44973L7.7574 17.6568C7.36688 18.0474 6.73371 18.0474 6.34319 17.6568C5.95266 17.2663 5.95266 16.6331 6.34319 16.2426L14.5356 8.05023H8.46451C7.91222 8.05023 7.46451 7.60252 7.46451 7.05023Z" fill="#29E53D "/>
        </svg>
      }
      {props.percentage.replace('-', '')}
    </div>
  )
}