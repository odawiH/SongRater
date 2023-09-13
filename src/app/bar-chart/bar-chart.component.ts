import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  data: {
    color?: string;
    label: string;
    value: number;
  }[] = [];
  @Input() data$: Observable<{ label: string; value: number }[]> =
    new Observable();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.data = data;
      this.createBarChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.createBarChart();
    }
  }

  private createBarChart(): void {
    // Löschung des vorherigen Diagramms
    d3.select(this.el.nativeElement).select('svg').remove();

    const margin = { top: 25, right: 20, bottom: 30, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Hier fügen wir die "color"-Eigenschaft hinzu, um die Farbe für jeden Balken festzulegen
    this.data.forEach((d) => {
      d.color =
        d.label === 'Liked'
          ? 'green'
          : d.label === 'Disliked'
          ? 'red'
          : 'black';
    });

    const svg = d3
      .select(this.el.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(this.data.map((d) => d.label))
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.value) || 1])
      .nice()
      .range([height, 0]);

    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => d.color || 'black'); // Verwende die "color"-Eigenschaft zur Farbzuweisung

    svg
      .selectAll('text.bar')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'bar')
      .attr('text-anchor', 'middle')
      .attr('x', function (d) {
        return <number>x(d.label);
      })
      .attr('y', function (d) {
        return y(d.value) - 10;
      })
      .text(function (d) {
        return d.value;
      });

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')));
  }
}
