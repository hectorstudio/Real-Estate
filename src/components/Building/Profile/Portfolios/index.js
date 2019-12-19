import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { getCurrentBuildingId } from '../../../../selectors/router';
import { getPortfolioById } from '../../../../selectors/portfolios';
import { getBuildingById, getBuildingsByPortfolioId } from '../../../../selectors/buildings';
import styles from '../../../../styles';
import Link from '../../../UI/Link';
import { ROUTES } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  address: {
    color: theme.palette.text.primary,
  },
  image: {
    marginBottom: -5,
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
  },
  imageWrapper: {
    marginBottom: theme.spacing(1),
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
  },
  item: {
    '&:hover': {
      textDecoration: 'none',
    },
    '&:not:last-of-type': {
      marginBottom: theme.spacing(3),
    },
    marginTop: theme.spacing(3),
  },
  portfolioLink: {
    display: 'block',
    marginTop: theme.spacing(0.5),
    textAlign: 'right',
    width: '100%',
  },
  sectionTitle: {
    borderBottom: `solid ${theme.palette.grey[600]} 1px`,
    fontWeight: 'normal',
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
}));

function Portfolios() {
  const s = useStyles();
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const building = useSelector((state) => getBuildingById(state, currentBuildingId));
  const portfolio = useSelector((state) => getPortfolioById(state, building?.portfolioId));
  const portfolioBuildings = useSelector((state) => getBuildingsByPortfolioId(state, portfolio?.id));

  if (!portfolio) {
    return null;
  }

  // Move current building to the end of the list
  const buildingIndex = portfolioBuildings.findIndex((b) => b.id === currentBuildingId);
  portfolioBuildings.push(portfolioBuildings.splice(buildingIndex, 1)[0]);

  return (
    <>
      <Typography className={s.sectionTitle} variant="h6">{portfolio.name}</Typography>
      <Link
        className={s.portfolioLink}
        to={ROUTES.home()}
      >
        {`${portfolioBuildings.length} Building${portfolioBuildings.length > 1 ? 's' : ''}`}
      </Link>
      <Grid container direction="column">
        {portfolioBuildings.map((b) => (
          <Link
            className={s.item}
            key={b.id}
            to={ROUTES.building.main(b.id)}
          >
            <Grid item>
              <Paper className={s.imageWrapper} elevation={styles.elevation}>
                <img
                  alt={b.name}
                  className={s.image}
                  src={b.coverPath}
                />
              </Paper>
              <Typography className={s.title} variant="body1">{b.name}</Typography>
              <Typography className={s.address} variant="body2">{`${b.address}, ${b.city}, ${b.country}`}</Typography>
            </Grid>
          </Link>
        ))}
      </Grid>
    </>
  );
}

export default Portfolios;
