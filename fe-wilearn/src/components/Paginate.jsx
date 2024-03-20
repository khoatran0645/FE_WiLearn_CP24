import { Pagination } from '@mui/material';

function Paginate(props) {
  const { count, page, onPageChange } = props;

  const handleChange = (event, value) => {
    event.preventDefault();
    onPageChange(value);
  };

  return (
    <Pagination
      count={count}
      page={page}
      onChange={(event, value) => handleChange(event, value)}
      shape="rounded"
    />
  );
}

export default Paginate;
