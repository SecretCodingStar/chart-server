import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 90, height: 30 });

export async function draw(configuration:any) {
    const image = await chartJSNodeCanvas.renderToBuffer(configuration, `image/png`);
    return image
}