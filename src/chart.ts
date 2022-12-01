import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export async function draw(configuration:any, {
    width = 800,
    height = 400,
}={}) {
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    const image = await chartJSNodeCanvas.renderToBuffer(configuration, `image/png`);
    return image
}