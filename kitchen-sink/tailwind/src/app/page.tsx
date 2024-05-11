import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import ClientForm from './ClientForm';

export default function Home(req: NextRequest, res: NextResponse) {
  const consent = cookies().get('consent')?.value ?? 'idle';
  const serverAction = async () => {
    'use server';
    console.log('server action');
    if (consent === 'consent') cookies().set('test', '1234');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ClientForm />
      <p>
        <b>Server Rendered</b>
      </p>
      <p>consent state: {consent}</p>
      <form action={serverAction}>
        <button type="submit">set cookie from server</button>
      </form>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ante
        sit amet sapien finibus euismod sed sed nisi. In mattis, dolor vitae
        tincidunt sagittis, justo libero molestie justo, quis placerat sapien
        tellus at massa. Vivamus purus neque, lacinia eget porttitor ac,
        fermentum nec turpis. Curabitur non dapibus dolor. Nunc bibendum a elit
        nec iaculis. Vivamus diam turpis, rutrum quis sem at, ornare tincidunt
        arcu. Donec pellentesque nec metus in dictum. Mauris accumsan leo at
        erat dictum dictum. Morbi aliquam nec mi in efficitur. In ac ligula vel
        ipsum commodo luctus. Praesent ipsum turpis, dignissim a consectetur at,
        efficitur id leo. Nam ac nisi in dolor lacinia eleifend. Nullam porta
        dolor pretium, tincidunt arcu ac, eleifend magna. Etiam laoreet, erat eu
        posuere placerat, libero mi dictum massa, vel laoreet ante tellus sed
        diam. Vestibulum blandit, eros vitae egestas scelerisque, augue ipsum
        tempor urna, vel faucibus tortor diam sit amet dui. Vestibulum bibendum
        suscipit efficitur. Aliquam ornare, nunc ac consequat semper, metus urna
        tincidunt metus, nec ornare velit arcu at erat. Pellentesque eleifend
        leo quam, nec rutrum orci euismod eget. Donec velit ligula, lacinia nec
        dolor et, luctus finibus tortor. Nunc bibendum, ligula eu semper
        elementum, lacus erat ornare elit, at facilisis tortor purus eu massa.
        Donec ultrices molestie rhoncus. Ut neque nisl, rhoncus sollicitudin
        fringilla eu, consectetur non mauris. Donec ullamcorper, tellus sed
        placerat rutrum, velit urna venenatis nibh, facilisis tempus urna libero
        id neque. Sed quam arcu, convallis id pellentesque et, dignissim at
        enim. Proin nibh magna, laoreet sed diam ac, egestas varius massa.
        Suspendisse porta arcu sed purus condimentum porta. Duis iaculis lacus
        nec ullamcorper maximus. Maecenas nec orci arcu. Donec ac ipsum lacinia,
        ullamcorper sem dapibus, accumsan nulla. Integer eleifend, ligula eget
        mattis ornare, lectus magna accumsan felis, ut tempus ex nisl quis nisi.
        Nunc tempor mattis tellus. Etiam semper, nibh ac tempus pellentesque,
        eros ante dignissim dui, quis vestibulum lectus nulla porttitor odio.
        Nulla laoreet quam ipsum, scelerisque dictum metus faucibus vitae. Fusce
        vel est eget nunc lacinia imperdiet ac quis justo. Nunc placerat a
        mauris nec facilisis. Quisque dignissim efficitur elit sed lobortis. Nam
        enim velit, congue sit amet ultricies in, blandit in leo. Proin
        vehicula, ante et maximus mattis, ipsum nisl scelerisque augue, ut
        fermentum velit metus sed lorem. Maecenas ligula libero, pharetra non
        fermentum quis, ultricies sed arcu. Nunc sagittis auctor bibendum.
        Vivamus placerat quis nisi eget suscipit. Cras molestie dolor a lorem
        porta rutrum. Fusce placerat sodales convallis. Vivamus vel gravida
        nulla. Nulla id augue metus. Nullam et sollicitudin est, id semper
        purus.
      </p>
    </main>
  );
}
