import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import posed from 'react-pose';

const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1.1,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
        scale: 1.05,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    }
});

const styles = theme => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
        // overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '80vh'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    tile: {
        // padding: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 31,
        height: 180,
        // width: 80,
    },
    tileFooter: {
        left: 0,
        right: 0,
        bottom: 0,
        height: '48px',
        display: 'flex',
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        color: 'white',
        paddingLeft: 16,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    tileContainer: {
        height: '100%',
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
    }
});


function GridTiles(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container className={classes.gridList}>
                {tileData.map((tile, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index} component={Box}
                        className={classes.tile} style={{ backgroundImage: `url(${tile.img})` }}>
                        <div className={classes.tileContainer}>
                            <div className={classes.tileFooter}>
                                <p>
                                    Dog
                                </p>
                            </div>
                        </div>
                        {/* <img src={tile.img} alt={tile.title} /> */}
                        {/* <GridListTileBar
                                title={tile.title}
                                subtitle={<span>by: {tile.author}</span>}
                            /> */}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default withStyles(styles)(GridTiles);


const tileData = [
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Image',
        author: 'author',
    },
];
