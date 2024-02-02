const Loading:React.FC = props => {
    return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen">
    <img
      src="https://static.wixstatic.com/media/ce39bd_b2eb1073c3d742b2972db5e514c3705f~mv2.gif"  // Replace with the path to your loading spinner GIF
      alt="Loading"
      className="w-[25%] h-auto"
    />
  </div>
    );
  };
  
  export default Loading;