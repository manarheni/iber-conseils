import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: '250px',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    boxShadow: '0 0 20px 0 rgb(62 28 131 / 15%)',
  },
  date: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  rating: {
    position: 'absolute',
    top: '200px',
    right: '20px',
    color: 'white',
    background: "none"
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '20px 20px 5px',
    color: "#222",
    fontSize: "20px",
    fontWeight: "bold",
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});
