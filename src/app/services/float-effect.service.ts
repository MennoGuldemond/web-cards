import {
  ApplicationRef,
  createComponent,
  ElementRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { EffectFloatComponent } from '@app/components';

@Injectable({ providedIn: 'root' })
export class FloatEffectService {
  private renderer: Renderer2;

  constructor(private appRef: ApplicationRef, private injector: Injector, private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(text: string, targetElement: ElementRef, positive: boolean = false) {
    const position = targetElement.nativeElement.getBoundingClientRect();

    const componentRef = createComponent(EffectFloatComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    const floatElement = componentRef.location.nativeElement;
    componentRef.instance.text = text;
    componentRef.instance.positive = positive;
    componentRef.instance.style = {
      top: `${position.top}px`,
      left: `${position.left + position.width / 2}px`,
      transform: 'translate(-50%, 0)',
    };

    this.appRef.attachView(componentRef.hostView);
    document.body.appendChild(floatElement);

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      floatElement.remove();
    }, 1000);
  }
}
