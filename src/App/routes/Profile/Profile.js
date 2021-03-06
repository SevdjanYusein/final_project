import React from 'react';
import Footer from '../../../Footer/Footer';
import GenresModal from '../../../GenresModal/GenresModalComponent';
import classes from './Profile.module.scss';
import userLogo from '../../../assets/images/user.png';
import Button from '../../../UI/Button/Button.js';
import BookList from '../../../BookList/BookList.js';

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            logoUrl: '',
            shelves: {
                read: [],
                reading: [],
                will: [],
            },
            genres: [],
            showModal: false,
        }
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        const user = JSON.parse(window.localStorage.getItem(window.sessionStorage.getItem("user")));
        const { username, shelves, genres } = user;
        this.setState({ username, shelves, genres });
    }

    handleModalClose(newSelectedGenres) {
        this.setState({ showModal: false, genres: newSelectedGenres })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.showModal ? <GenresModal handleModalClose={this.handleModalClose} favoriteGenres={this.state.genres} /> : ''}
                <div className={classes.Wrapper}>
                    <div><img className={classes.userLogo} src={userLogo} alt="userLogo"></img>
                    </div>
                    <div className={classes.UserInfo}>
                        <h2>{this.state.username}</h2>
                        <hr />
                        <p>{this.state.username}'s bookshelves</p>
                        <ul>
                            <li>read‎: ({this.state.shelves.read.length})</li>
                            <li>currently-reading‎: ({this.state.shelves.reading.length})</li>
                            <li>want to read: ({this.state.shelves.will.length})</li>
                        </ul>
                    </div>
                    <div className={classes.UserFavGenres}>
                        <h3>Favorite genres</h3>
                        <div className={classes.EditButton}>
                            <Button title="(edit)" onClick={() => this.setState({ showModal: true })} />
                        </div>
                        <hr />
                        <div className={classes.GenresList}>{this.state.genres.map((genre, i) => {
                            return <p key={genre} className={classes.Genre}>{genre}</p>
                        })}</div>
                    </div>
                </div>
                <div className={classes.UserBooks}>
                    <h3>You can find new books here</h3>
                    <hr />
                    <div className={classes.List}><BookList /></div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}
export default ProfileComponent;