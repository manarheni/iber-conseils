import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { likePost } from '../../../actions/posts';
import useStyles from './styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import HotelIcon from '@material-ui/icons/Hotel';
import PoolIcon from '@material-ui/icons/Pool';
import BathtubIcon from '@material-ui/icons/Bathtub';
import ApartmentIcon from '@material-ui/icons/Apartment';
import KitchenIcon from '@material-ui/icons/Kitchen';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const classes = useStyles();
  moment.locale('fr');

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async (e) => {
    e.stopPropagation();
    dispatch(likePost(post?._id));

    if (hasLikedPost) {
      setLikes(post?.likes?.filter((id) => id !== userId));
    } else {
      setLikes([...post?.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId)
        ? (
          <div className="like-container">{likes?.length > 2 ? `You and ${likes?.length - 1} others` : `${likes?.length} like${likes?.length > 1 ? 's' : ''}` }&nbsp;<FavoriteIcon className="like-svg" fontSize="small" /></div>
        ) : (
          <div className="like-container">{likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'}&nbsp;<FavoriteBorderIcon className="like-svg" /></div>
        );
    }
    return <div className="like-container">Like&nbsp;<FavoriteBorderIcon className="like-svg" /></div>;
  };

  return (
    <Card className={classes.card} raised elevation={6}>
          <CardMedia className={classes.media} 
           image={ post?.photos && post?.photos.length > 0 ? post?.photos[0] : 
           post?.category ==="Terrain" ? 'https://img.freepik.com/photos-gratuite/paysage-terrain-cultive_1232-859.jpg?w=2000':
           post?.category === "Appartement" ? 'https://thumbs.dreamstime.com/b/immeuble-19532951.jpg':
           post?.category ==="Achat Bureau" ? 'http://www.jpg.fr/centre-de-connaissances/wp-content/uploads/meubles-de-bureau-conseils-pour-un-montage-reussi-770x513.jpg' :
           post?.category ==="Villa"? 'https://upload.wikimedia.org/wikipedia/commons/5/50/GREEN_HOUSE_Villa.jpg' :
           'https://d1qfj231ug7wdu.cloudfront.net/pictures/estate/4809/4808592/208922696460069c1b7ee0c0.89812354_449.jpg ' 
            }   
           title={post?.title} />
          <Link to={`/posts/${post?._id}`}>
            <div className="post-image-overlay"></div>
          </Link>
          <div className={classes.date}>
            <p className="date-label">{moment(post?.createdAt).endOf('day').fromNow()}</p>
          </div>
          <Button className="like-button" disabled={!user?.result} onClick={e => handleLike(e)}>
            <Likes />
          </Button>
          <h4 className="type-band">
            { post.type === 'Achat' ? 'Achat de ' : 'Location de ' }
            {
              post.category === 'Terrain' ? 'terrain'
              : post.category === 'Appartement' ? 'appartement'
              : post.category === 'Villa' ? 'maison, villa'
              : post.category === 'Achat Bureau' ? 'bureau'
              : post.category === 'Achat Fond' ? 'fonds de commerce'
              : post.category === 'Location Bureau' ? 'bureau'
              : post.category === 'Location Fond' ? 'fonds de commerce'
              : null
            }
          </h4>
          <div className={classes.rating + " post-btn"} name="edit">
              <Rating className="post-rating" name="size-large" value={post.rating} precision={0.5} size="large" readOnly={true} />
          </div>
        
          <Link to={`/posts/${post._id}`} ><Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography></Link>
          <div className="post-location flex start">
                <LocationOnIcon />
                {post.location}&nbsp;:&nbsp;&nbsp;{post.adress}
          </div>
          <CardContent>
              <div className="card-post mypost-index">  
                  <div className="flex start wrap">
                        { post.area && post.area > 0 ? (
                          <div className="card-elem flex start mr4" >
                            <SettingsOverscanIcon />
                            <span><strong>{post.area || null}</strong> M<sup>2</sup></span>
                          </div>
                        ) : null}
                        { post.rooms && post.rooms > 0 ? (
                          <div className="card-elem flex start mr4" >
                            <HotelIcon />
                            <span><strong>{post.rooms}</strong></span>
                          </div>
                        ) : null}
                        { post.kitchens && post.kitchens > 0 ? (
                          <div className="card-elem flex start mr4" >
                            <KitchenIcon />
                            <span><strong>{post.kitchens}</strong></span>
                          </div>
                        ) : null}
                        { post.batherooms && post.batherooms > 0 ? (
                          <div className="card-elem flex start mr4" >
                            <BathtubIcon />
                            <span><strong>{post.batherooms}</strong></span>
                          </div>
                        ) : null}
                        { post.balconies && post.balconies > 0 ? (
                          <div className="card-elem flex start mr4" >
                            <ApartmentIcon />
                            <span><strong>{post.balconies}</strong></span>
                          </div>
                        ) : null}
                        { post.pools && post.pools > 0 ? (
                          <div className="card-elem flex start mr4" >
                            <PoolIcon />
                            <span><strong>{post.pools}</strong></span>
                          </div>
                        ) : null}
                    </div>
              </div>
            <Typography variant="body2" color="textSecondary" component="p">{post.description?.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
    </Card>
  );
};

export default Post;



  