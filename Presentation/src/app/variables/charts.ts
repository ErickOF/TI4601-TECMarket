import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';

Chart.register(...registerables);
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.color = '#8898aa';
Chart.defaults.font.family = 'Open Sans';

const colors = {
  gray: {
    300: '#dee2e6',
    600: '#8898aa',
    900: '#212529'
  },
  primary: '#5e72e4',
  warning: '#fb6340',
  transparent: 'transparent'
};

export const chartExample1: ChartConfiguration<'line', number[], string> = {
  type: 'line',
  options: {
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0,
        backgroundColor: colors.primary
      },
      line: {
        tension: 0.4,
        borderWidth: 4,
        borderColor: colors.primary,
        backgroundColor: colors.transparent,
        borderCapStyle: 'round'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: colors.gray[900]
        },
        ticks: {
          padding: 10,
          callback: (value) => Number(value) % 10 === 0 ? `$${value}k` : ''
        }
      }
    }
  },
  data: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Performance',
      data: [0, 20, 10, 30, 15, 40, 20, 60],
      borderColor: colors.primary,
      backgroundColor: colors.transparent
    }]
  }
};

export const chartExample2: ChartConfiguration<'bar', number[], string> = {
  type: 'bar',
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: colors.gray[300]
        },
        ticks: {
          padding: 10
        }
      }
    }
  },
  data: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Sales',
      data: [25, 20, 30, 22, 17, 29],
      backgroundColor: colors.warning,
      borderRadius: 6,
      borderSkipped: false,
      maxBarThickness: 10
    }]
  }
};

export { Chart };
