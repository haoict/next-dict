import { connect } from 'react-redux';
import { getWordData } from '../src/store/actions/word-data';
import WordView from '../src/visual-components/word-view';

const Word = props => {
  const { id, isLoading, data, error } = props;
  return <WordView id={id} isLoading={isLoading} data={data} error={error} />;
};

Word.getInitialProps = async function(context) {
  const { id } = context.query;
  if (context.req) {
    // if server side, wait for the request to finish, because we have to return html with full data
    await context.store.dispatch(getWordData(id));
  } else {
    // if it is client side, we don't have to wait for data to come
    // so when user click to pokemon page, client will navigate immediately
    context.store.dispatch(getWordData(id));
  }

  return { id };
};

const mapStateToProps = state => ({
  isLoading: state.wordData.isLoading,
  data: state.wordData.data,
  error: state.wordData.error
});

export default connect(mapStateToProps)(Word);
