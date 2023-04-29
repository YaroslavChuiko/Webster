import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '~/components/Loader/Loader';

type Props = {
  count: number;
  fetchItems: () => void;
  children: ReactNode;
};

const InfiniteWrapper = ({ count, fetchItems, children }: Props) => {
  return (
    <InfiniteScroll
      scrollableTarget={'imageGrid'}
      dataLength={count}
      style={{ overflow: 'hidden' }}
      next={fetchItems}
      hasMore={true}
      loader={<Loader />}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteWrapper;
