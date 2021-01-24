import React from "react";
import PropTypes from "prop-types";
import colors from "../constants/colors";
import {
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";

const Block = ({data}) => {
    const classes = useStyles();
    return (
        <Box className={classes.block}>
            <Typography className={classes.number} variant="overline">{data.id.padStart(3,"0")}</Typography>
            <Typography variant="body2">{data.data}</Typography>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    number: {
      fontSize: '10px',
      color: colors.blue,
    },
    block: {
        backgroundColor: colors.lightGrey,
        margin: '5px 0',
        borderRadius: '2px',
        padding: '5px 10px',
    }
  }));


Block.propTypes = {
    data: PropTypes.object.isRequired,
  };

export default Block;
