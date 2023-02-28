import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import currencyFormat from '@/lib/utils/format'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context: { dataset: { label: string; }; parsed: { y: number | null | undefined; }; }) {
          let label = context.dataset.label || '';
          if(label) {label += ': '}
          if (context.parsed.y !== null) {
            label += currencyFormat(context.parsed.y)
          }
          return label
        },
      }
    }
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      ticks: {
        font: {
          size: 8
        },
        maxRotation: 0,
        
      },
      grid: {
        color: 'rgba(216, 224, 220, 0.2)',
      }
    }
  },
};

const labels = ['01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am', '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm', '12:00 am']

export default function CustomLineChart(props: {data: number[] | undefined}) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos por hora',
        data: props.data,
        borderColor: 'rgb(41, 229, 146)',
        backgroundColor: 'rgba(41, 229, 146, 0.5)',
        borderWidth: 1,
        radius: 2
      }
    ]
  }
  return <Line data={data} options={options}></Line>

}