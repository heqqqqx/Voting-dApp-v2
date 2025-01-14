'use client';

import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';

interface Proposal {
  id: number;
  name: string;
  voteCount: number;
}

interface ResultsChartProps {
  proposals: Proposal[];
}

export function ResultsChart({ proposals }: ResultsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const totalVotes = proposals.reduce((sum, proposal) => sum + proposal.voteCount, 0);

        const chartConfig: ChartConfiguration = {
          type: 'bar',
          data: {
            labels: proposals.map(p => p.name),
            datasets: [{
              label: 'Votes',
              data: proposals.map(p => p.voteCount),
              backgroundColor: 'rgba(147, 51, 234, 0.7)', // Purple color
              borderColor: 'rgba(147, 51, 234, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.parsed.y;
                    const percentage = ((value / totalVotes) * 100).toFixed(2);
                    return `Votes: ${value} (${percentage}%)`;
                  }
                }
              }
            }
          }
        };

        // Create a new chart instance and store it in the ref
        chartInstanceRef.current = new Chart(ctx, chartConfig);
      }
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [proposals]);

  return <canvas ref={chartRef} />;
}

