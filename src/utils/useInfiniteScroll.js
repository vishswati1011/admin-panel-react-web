// useInfiniteScroll.js

import { useEffect, useCallback } from "react";

const useInfiniteScroll = (loading, data, callback) => {
  //   const [page, setPage] = useState(1);

  const handleInfiniteScroll = useCallback(() => {
    try {
      if (
        !loading &&
        data.length > 0 &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        // setPage((prev) => prev + 1);
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  }, [loading, data]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);
};

export default useInfiniteScroll;
