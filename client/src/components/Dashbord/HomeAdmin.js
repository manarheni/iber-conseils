import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WaitingPosts from './WaitingPosts';
import PostInfos from './PostInformations/WaitingPostInformations';
import ChatModule from '../ChatModule'

export default function HomeAdmin(props) {
    const { classes } = props;
    const { fixedHeightPaper } = props;
    const [selectedPost, setSelectedPost] = useState(null);
    const [reloadChat, setReloadChat] = useState(false);

    return (
        <Grid container spacing={3}>
            {/* Posts */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <WaitingPosts onSelect={post => setSelectedPost(post)} selectedPost={selectedPost} />
              </Paper>
            </Grid>
            {/* infos */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <PostInfos post={selectedPost} clear={() => setSelectedPost(null)} />
              </Paper>
            </Grid>
            {/* Chat */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={ classes.paper + ' admin-chat'}>
                <ChatModule post={selectedPost} reloadChat={reloadChat} reloaded={e => setReloadChat(false)} />
              </Paper>
            </Grid>
        </Grid>
    )
}
