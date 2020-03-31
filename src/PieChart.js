import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import { RadialChart, Hint } from 'react-vis';
import { getColor as getRandomMUIColor } from 'random-material-color';

const useStyles = makeStyles(() => ({
  hint: {
    backgroundColor: grey[900],
    color: grey[100],
    minWidth: '100px',
    padding: '8px 16px',
  },
}));

export default function PieChart({
  className = '',
  diameter,
  data,
  valueClickHandler,
  valueType = '',
}) {
  const classes = useStyles();

  const [hintValue, setHintValue] = useState(false);
  const [pieColors, setPieColors] = useState([]);

  useEffect(() => {
    let colors = [];

    for (let i = 0; i < 250; i++) {
      const randomColor = getRandomMUIColor({
        shades: ['400', '500', '600', '700', '800', '900'],
      });
      colors = [...colors, randomColor];
    }

    setPieColors(colors);
  }, []);

  return (
    <RadialChart
      className={className}
      colorRange={pieColors}
      data={data}
      getAngle={d => d.value}
      height={diameter}
      innerRadius={diameter / 3}
      onSeriesMouseOut={_v => {
        setHintValue(false);
      }}
      onValueClick={(v, _event) => {
        valueClickHandler && valueClickHandler(v);
      }}
      onValueMouseOver={v => {
        setHintValue(v);
      }}
      padAngle={0.04}
      radius={diameter / 2}
      width={diameter}
    >
      {hintValue !== false && (
        <Hint value={hintValue}>
          <Paper className={classes.hint}>
            <Typography component="p" variant="body2">
              <strong>{hintValue.label}</strong>:{' '}
              {numeral(hintValue.value).format('0,0')} {valueType}
            </Typography>
          </Paper>
        </Hint>
      )}
    </RadialChart>
  );
}
