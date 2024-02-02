export interface IRatingProps {
    isOpen:boolean
    onClose:(e:boolean)=> void
    ratingCounts:{
      [key:string]:number
    }
  }