import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';
import { Router } from '@angular/router';
import { StoriesService } from "../../services/stories.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Activity} from "../../Modelo/Activity";
import { SharedService} from "../../services/shared.service";
import { VocQ} from "../../Modelo/vocQ";

export interface DefaultEntries {
  someProperty: string;
  anotherProperty: number;
}


@Component({
  selector: 'app-body-question',
  templateUrl: './body-question.component.html',
  styleUrls: ['./body-question.component.css'],
})

export class BodyQuestionComponent implements AfterViewInit, OnInit {

  @ViewChild('cesdk_container') containerRef: ElementRef = {} as ElementRef;
  campo:string="";
  campo2:string="";
  aa:string ="sdssdfsd";
  vv:string ="hola";
  title = 'Integrate CreativeEditor SDK with Angular';
  page: number = 1;
  prevCode: string[] = [];
  imageCodes: string[] = [];

  bbb: boolean= false;
  ccc: boolean=false;
  private instance: any;
  private imageCodeIndex: number = 0;
  jsonConvertido: string = '';
  imgPrincipal: string = '';
  private imageblobIndex: number = 0;
  ddd:number=0;

  DatosVoc: VocQ[] = [];

  AlmacenTotal: any[]=[];
  Almacenpalabras: any[]=[];
  Almacensignificaos: any[]=[];

  postStoryForm: FormGroup;



  constructor( private storiesService: StoriesService, private fb: FormBuilder, private router: Router, private authService: AuthService, private sharedService: SharedService // Agrega el servicio compartido
  ) {
    this.postStoryForm = this.fb.group({});
    this.miFormulario = this.fb.group({
      palabras: this.fb.array([]),
    });

    // Agregar un grupo inicial
    this.agregarCampo();
  }
  miFormulario: FormGroup;
  palabraGrupos: FormGroup[] = [];

  agregarCampo() {
    this.ddd=2;
    const nuevoGrupo = this.fb.group({
      palabra: ['', Validators.required],
      significado: ['', Validators.required],
    });

    this.palabraGrupos.push(nuevoGrupo);
    this.palabras.push(nuevoGrupo);

  }

  eliminarCampo() {
    this.ddd=1;
    if (this.palabraGrupos.length > 1) {
      this.palabraGrupos.pop();
      this.palabras.removeAt(this.palabras.length - 1);
    }
  }

  guardarDatos() {
    // Mapea los datos y almacénalos en dos listas separadas
    const palabrasGuardadas: string[] = [];
    const significadosGuardados: string[] = [];

    this.palabraGrupos.forEach(grupo => {
      const palabra = grupo.get('palabra')?.value || '';
      const significado = grupo.get('significado')?.value || '';

      palabrasGuardadas.push(palabra);
      significadosGuardados.push(significado);
    });

    console.log('Palabras guardadas:', palabrasGuardadas);
    console.log('Significados guardados:', significadosGuardados);

    this.Almacenpalabras[this.page]=palabrasGuardadas
    this.Almacensignificaos[this.page]=significadosGuardados
    console.log('Almacen palabras:', this.Almacenpalabras[this.page]);
    console.log('Almacen sig:', this.Almacensignificaos[this.page]);

    this.AlmacenTotal[0] = this.Almacenpalabras
    this.AlmacenTotal[1] = this.Almacensignificaos

    console.log('Almacen total:', this.AlmacenTotal);
    console.log('Almacen total: primeras palabras', this.AlmacenTotal[0][1][0]);

    this.campo="";

  }

  get palabras() {
    return this.miFormulario.get('palabras') as FormArray;
  }




  ngOnInit() {
    this.ddd=1;
    this.postStoryForm = this.fb.group({
      title: [null, [Validators.required]],
      accessWord: [null, [Validators.required]],
    });
  }





  ngAfterViewInit() {
      this.initializeCreativeEditor();
  }

  private async initializeCreativeEditor() {

    // Asigna la instancia actual a la propiedad 'instance'
    this.instance = await CreativeEditorSDK.create(this.containerRef.nativeElement, this.config);

    await this.instance.addDefaultAssetSources();
    await this.instance.addDemoAssetSources({ sceneMode: "Design" });
    this.instance.createDesignScene();
  }


  config: Configuration = {
    // Serve assets from IMG.LY cdn or locally
    baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.18.0/assets',
    // Enable local uploads in Asset Library
    locale: 'es',
    i18n: {
      es: {
        'common.back': 'Atrás',
        'meta.currentLanguage': 'Español',

        "common.delete": "Borrar",
        "action.align": "Alinear",
        "action.align.bottom": "Abajo",
        "action.align.bottom.description": "Alinear abajo",
        "action.align.elements": "Alinear elementos",
        "action.align.horizontalCenter": "Centrado",
        "action.align.horizontalCenter.description": "Alinear centro (horizontal)",
        "action.align.left": "Izquierda",
        "action.align.left.description": "Alinear izquierda",
        "action.align.right": "Derecha",
        "action.align.right.description": "Alinear derecha",
        "action.align.top": "Arriba",
        "action.align.toPage": "Alinear a la página",
        "action.align.top.description": "Alinear arriba",
        "action.align.verticalCenter": "Centro vertical",
        "action.align.verticalCenter.description": "Alinear centro (vertical)",
        "action.arrange": "Mover",
        "action.arrange.toFront": "Traer al frente",
        "action.arrange.bringForward": "Traer adelante",
        "action.arrange.sendBackward": "Enviar hacia atrás",
        "action.arrange.toBack": "Enviar al fondo",
        "action.audio.delete": "Borrar audio",
        "action.audio.replace": "Reemplazar audio",
        "action.block.add": "Agregar elemento",
        "action.block.copy": "Copiar elemento",
        "action.block.delete": "Borrar elemento",
        "action.block.delete_plural": "Borrar elementos ({{count}})",
        "action.block.duplicate": "Duplicar elemento",
        "action.block.flipX": "Voltear elemento (horizontal)",
        "action.block.flipY": "Voltear elemento (vertical)",
        "action.block.lock": "Bloquear elemento",
        "action.block.lock.description": "Bloquear elemento",
        "action.block.move": "Mover elemento",
        "action.block.paste": "Pegar elemento",
        "action.block.rename": "Renombrar elemento",
        "action.block.resize": "Cambiar tamaño del elemento",
        "action.block.rotate": "Rotar elemento",
        "action.block.toggleVisibility": "(Des)ocultar elemento",
        "action.block.unlock": "Desbloquear elemento",
        "action.block.unlock.description": "Desbloquear elemento",
        "action.crop.exit": "Salir del modo de recorte",
        "action.crop.mirrorX": "Espejo horizontal de la imagen",
        "action.crop.mirrorY": "Espejo vertical de la imagen",
        "action.crop.reset": "Restablecer ajustes de recorte",
        "action.crop.turn": "Girar la imagen 90˚ en sentido antihorario",
        "action.crop.turnAndMirror": "Girar y espejo",
        "action.cutoutOffset.change": "Cambiar {{input.cutoutOffset}}",
        "action.cutoutSmoothing.change": "Cambiar {{input.cutoutSmoothing}}",
        "action.cutoutType.change": "Cambiar {{input.cutoutType}}",
        "action.distribute": "Distribuir",
        "action.distribute.horizontally": "Horizontalmente",
        "action.distribute.horizontally.description": "Distribuir horizontalmente",
        "action.distribute.vertically": "Verticalmente",
        "action.distribute.vertically.description": "Distribuir verticalmente",
        "action.editText": "Editar",
        "action.effect.add": "Aplicar efecto",
        "action.effect.remove": "Quitar efecto",
        "action.enterGroup": "Entrar al grupo",
        "action.fillType.change": "Cambiar tipo de relleno",
        "action.filter.add": "Aplicar filtro",
        "action.filter.remove": "Quitar filtro",
        "action.gradient.addStop": "Agregar nuevo punto en {{position}}%",
        "action.gradient.removeStop": "Eliminar color",
        "action.group": "Agrupar elementos",
        "action.image.blur": "Aplicar desenfoque",
        "action.image.crop": "Recortar imagen",
        "action.image.effect": "Aplicar efecto a la imagen",
        "action.image.filter": "Aplicar filtro a la imagen",
        "action.image.inpainting": "Rellenar imagen",
        "action.image.matting": "Eliminar fondo",
        "action.image.matting.staging": "Eliminar fondo (previsualización)",
        "action.image.replace": "Reemplazar imagen",
        "action.image.smartCrop": "Recorte inteligente",
        "action.image.smartImage": "Funciones inteligentes de imagen",
        "action.image.smartImage.description": "Acciones de funciones inteligentes",
        "action.image.superResolution": "Súper resolución",
        "action.page.add": "Agregar página",
        "action.page.changeFormat": "Cambiar formato de página",
        "action.page.delete": "Borrar página",
        "action.pageMove.down": "Mover hacia abajo",
        "action.pageMove.down.description": "Mover página hacia abajo",
        "action.pageMove.left": "Mover hacia la izquierda",
        "action.pageMove.left.description": "Mover página hacia la izquierda",
        "action.pageMove.right": "Mover hacia la derecha",
        "action.pageMove.right.description": "Mover página hacia la derecha",
        "action.pageMove.up": "Mover hacia arriba",
        "action.pageMove.up.description": "Mover página hacia arriba",
        "action.placeholder.change": "Cambiar restricciones de {{common.placeholder}}",
        "action.placeholder.create": "Crear {{common.placeholder}}",
        "action.placeholder.remove": "Quitar {{common.placeholder}}",
        "action.position": "Posición",
        "action.property.reset": "Restablecer propiedades del elemento a los valores predeterminados",
        "action.property.update": "Actualizar propiedad del elemento",
        "action.scene.load": "Cargar escena",
        "action.scene.new": "Nueva escena",
        "action.selectGroup": "Seleccionar grupo",
        "action.shadow.angle.change": "Cambiar ángulo de sombra",
        "action.shadow.angle.rotate": "Girar sombra 45 grados en sentido horario",
        "action.shadow.blur.change": "Cambiar desenfoque de sombra",
        "action.shadow.color.change": "Cambiar color de sombra",
        "action.shadow.distance.change": "Cambiar distancia de sombra",
        "action.strokeCornerGeometry.change": "Cambiar unión de trazado",
        "action.strokePosition.change": "Cambiar posición de trazado",
        "action.strokeStyle.change": "Cambiar {{property.strokeStyle.description}}",
        "action.text.autoHeight": "Habilitar altura automática",
        "action.text.autoHeight.automatic": "Se habilitó la altura automática del marco",
        "action.text.change": "Cambiar texto",
        "action.text.changeCase": "Cambiar mayúsculas y minúsculas del texto",
        "action.text.fixedFrame": "Habilitar marco fijo",
        "action.text.fixedFrame.automatic": "Se estableció la altura del marco como fija",
        "action.ungroup": "Desagrupar elemento",
        "action.video.replace": "Reemplazar video",
        "block.audio": "Audio",
        "block.cutout": "Recorte",
        "block.ellipse": "Elipse",
        "block.group": "Grupo",
        "block.image": "Imagen",
        "block.line": "Línea",
        "block.page": "Página",
        "block.polygon": "Polígono",
        "block.rect": "Rectángulo",
        "block.scene": "Documento",
        "block.star": "Estrella",
        "block.sticker": "Calcomanía",
        "block.text": "Texto",
        "block.vectorPath": "Trayecto vectorial",
        "block.video": "Video",
        "block.graphic": "Gráfico",
        "color.aqua": "Aqua",
        "color.black": "Negro",
        "color.blue": "Azul",
        "color.cyan": "Cian",
        "color.green": "Verde",
        "color.magenta": "Magenta",
        "color.orange": "Naranja",
        "color.purple": "Morado",
        "color.red": "Rojo",
        "color.yellow": "Amarillo",
        "color.transparent": "Transparente",
        "common.advanced": "Avanzado",
        "common.arrange": "Organizar",
        "common.axis.x": "X",
        "common.axis.y": "Y",
        "common.cancel": "Cancelar",
        "common.close": "Cerrar",
        "common.color": "Color",
        "common.colorValue": "Valor de color",
        "common.spotColor": "Color de punto",
        "common.srgb": "sRGB",
        "common.cmyk": "CMYK",
        "common.tint": "Tinte",
        "common.confirm": "Confirmar",
        "common.controlKey": "Ctrl",
        "common.custom": "Guardar",
        "common.defaultDuration": "Duración predeterminada de la página",
        "common.defaultDuration.inUnit": "Duración predeterminada de la página en segundos",
        "common.done": "Hecho",
        "common.download": "Descargar",
        "common.duplicate": "Duplicar",
        "common.edit": "Editar",
        "common.editColor": "Editar color",
        "common.export": "Exportar",
        "common.fill": "Relleno",
        "common.formats": "Formatos",
        "common.height": "Altura",
        "common.height.inUnit": "Altura en {{unit}}",
        "common.hue": "Tono",
        "common.image": "Imagen",
        "common.inch": "Pulgada",
        "common.load": "Cargar",
        "common.lock": "Bloquear",
        "common.millimeter": "Milímetro",
        "common.mixed": "Mezclado",
        "common.mode.design": "Diseño",
        "common.mode.preview": "Vista previa",
        "common.mode.template": "Plantilla",
        "common.more": "Más",
        "common.nearestColorName": "Nombre de color más cercano",
        "common.off": "Apagar",
        "common.on": "Encender",
        "common.opacity": "Opacidad",
        "common.page": "Páginaaaa",
        "common.pause": "Pausa",
        "common.pixel": "Píxel",
        "common.pixelScale": "Escala de píxeles",
        "common.placeholder": "Marcador de posición",
        "common.play": "Reproducir",
        "common.position": "Posición",
        "common.properties": "Propiedades",
        "common.property": "Propiedad",
        "common.redo": "Rehacer",
        "common.reloadPage": "Recargar página",
        "common.replace": "Reemplazar",
        "common.reset": "Restablecer",
        "common.resolution": "Resolución",
        "common.role": "Rol",
        "common.role.adopter": "estudiante",
        "common.role.creator": "docente",
        "common.role.presenter": "Presentador",
        "common.role.viewer": "Espectador",
        "common.rotateAndFlip": "$t(common.rotation) y $t(property.flip)",
        "common.rotation": "Rotar",
        "common.rotation.inUnit": "$t(common.rotation) en grados",
        "common.save": "Guardar",
        "common.select": "Seleccionar",
        "common.size": "Tamaño",
        "common.style": "Estilo",
        "common.transform": "Transformar",
        "common.undo": "Deshacer",
        "common.unit": "Unidad",
        "common.unit.description": "Unidad de medida",
        "common.unlock": "Desbloquear",
        "common.video": "Video",
        "common.width": "Ancho",
        "common.width.inUnit": "Ancho en {{unit}}",
        "component.alignAndArrange": "Mover y alinear",
        "component.assetPanelAutoCloseSettings": "Después de insertar",
        "component.assetPanelAutoCloseSettings.false": "Mantener abierto",
        "component.assetPanelAutoCloseSettings.false.description": "Mantener abierto el panel de la biblioteca de activos después de insertar un activo",
        "component.assetPanelAutoCloseSettings.true": "Cerrar",
        "component.assetPanelAutoCloseSettings.true.description": "Cerrar el panel de la biblioteca de activos después de insertar un activo",
        "component.assetPanelFloatingSettings": "Comportamiento",
        "component.assetPanelFloatingSettings.fixed": "Fijo",
        "component.assetPanelFloatingSettings.fixed.description": "La biblioteca de inserción está fija junto al lienzo",
        "component.assetPanelFloatingSettings.floating": "Flotante",
        "component.assetPanelFloatingSettings.floating.description": "La biblioteca de inserción flota sobre el lienzo",
        "component.assetSettings": "Activos",
        "component.assetSettings.image.adjustments": "Ajustes",
        "component.assetSettings.image.blur": "Desenfoque",
        "component.assetSettings.image.crop": "Recortar",
        "component.assetSettings.image.effects": "Efectos",
        "component.assetSettings.image.filters": "Filtros",
        "component.assetSettings.opacity": "$t(common.opacity)",
        "component.assetSettings.text.advanced": "Texto avanzado",
        "component.assetSettings.text.color": "Color del texto",
        "component.assetSettings.transform": "Transformar",
        "component.audio.properties": "Propiedades de audio",
        "component.audio.source": "Original",
        "component.audio.trim": "Recortar audio",
        "component.audio.trim.description": "Ajustar el recorte de audio",
        "component.audio.trim.duration": "Duración del recorte",
        "component.audio.trim.duration.description": "Establecer la duración del audio recortado",
        "component.audio.trim.play": "$t(common.play)",
        "component.audio.trim.play.description": "$t(common.play) audio recortado",
        "component.canvas": "Lienzo del editor",
        "component.canvas.openLibrary": "Añadir elementos",
        "component.canvas.state.error": "No se pudo cargar el motor del editor",
        "component.canvas.state.loading": "Cargando editor",
        "component.canvas.state.loading.description": "Solo unos segundos...",
        "component.canvas.state.unsupported": "El navegador no es compatible",
        "component.colorPicker.colorItem": "Elemento de color {{index}}",
        "component.colorPicker.colorItem.description": "Haga clic para usar este color ({{color}})",
        "component.colorPicker.colorItem.hexInput": "Hex",
        "component.colorPicker.colorItem.transparent": "Elemento de color {{index}}, Nombre de color: transparente",
        "component.colorPicker.description": "Cambiar color",
        "component.colorPicker.hsl.description": "{{componentName}}, $t(common.nearestColorName): {{nearestColorName}}; $t(common.colorValue): tono: {{hue}}°, saturación: {{saturation}}%, luminosidad: {{lightness}}%",
        "component.colorPicker.hueGradient": "Selección de degradado de tono",
        "component.colorSchemeSelect.accent": "Color de acento",
        "component.colorSchemeSelect.accent.description": "Cambiar el color de acento",
        "component.colorSchemeSelect.active": "Color activo",
        "component.colorSchemeSelect.active.description": "Cambiar el color activo",
        "component.colorSchemeSelect.background": "Color de fondo",
        "component.colorSchemeSelect.background.description": "Cambiar el color de fondo",
        "component.contentFill": "$t(common.fill)",
        "component.contentFill.color": "$t(common.color)",
        "component.contentFill.image": "$t(common.image)",
        "component.contentFill.options": "Opciones de tipo de relleno",
        "component.contentFill.options.description": "Cambiar el tipo de relleno",
        "component.contentFill.video": "$t(common.video)",
        "component.cutout": "Configuración",
        "component.dnd.description": "Los archivos añadidos se almacenan en la biblioteca",
        "component.dnd.prompt": "Arrastre el archivo aquí",
        "component.dockIconSizeSelect": "Escalado de iconos de la barra de herramientas",
        "component.dockIconSizeSelect.large": "Grande",
        "component.dockIconSizeSelect.large.description": "Seleccionar escalado grande de iconos de la barra de herramientas",
        "component.dockIconSizeSelect.normal": "Normal",
        "component.dockIconSizeSelect.normal.description": "Seleccionar escalado normal de iconos de la barra de herramientas",
        "component.dockLabelVisibilityToggle": "Etiquetas de la barra de herramientas",
        "component.dockLabelVisibilityToggle.hide": "Ocultar",
        "component.dockLabelVisibilityToggle.hide.description": "Ocultar etiquetas de los botones de la barra de herramientas",
        "component.dockLabelVisibilityToggle.show": "Mostrar",
        "component.dockLabelVisibilityToggle.show.description": "Mostrar etiquetas de los botones de la barra de herramientas",
        "component.fileOperation.archiveScene": "Exportar archivo comprimido",
        "component.fileOperation.exportImage": "Guardar pagina",
        "component.fileOperation.exportPDF": "Exportar PDF",
        "component.fileOperation.exportScene": "Exportar archivo de diseño",
        "component.fileOperation.exportVideo": "Exportar video",
        "component.fileOperation.importScene": "Importar archivo de diseño",
        "component.fileOperation.more": "Mostrar más opciones",
        "component.fileOperation.save": "$t(common.save)",
        "component.fileOperation.share": "Compartir como plantilla",
        "component.inspectorPositionSelect": "$t(common.position)",
        "component.inspectorPositionSelect.left": "Izquierda",
        "component.inspectorPositionSelect.left.description": "Seleccionar que el inspector esté en el lado izquierdo",
        "component.inspectorPositionSelect.right": "Derecha",
        "component.inspectorPositionSelect.right.description": "Seleccionar que el inspector esté en el lado derecho",
        "component.languageSelect": "Idioma",
        "component.languageSelect.description": "Seleccionar idioma",
        "component.layerList": "Navegador",
        "component.layerList.collapseLayers": "Colapsar lista de capas",
        "component.layerList.collapsePages": "Colapsar lista de páginas",
        "component.layerList.empty": "No hay elementos en esta página",
        "component.layerList.expandLayers": "Expandir lista de capas",
        "component.layerList.expandPages": "Expandir lista de páginas",
        "component.layerList.hide": "Ocultar capa",
        "component.layerList.layers": "Capas",
        "component.layerList.pages": "Páginas",
        "component.library": "Biblioteca",
        "component.library.addFile": "Añadir archivo",
        "component.library.breadcrumbRoot": "Todos",
        "component.library.clearSearch": "Borrar búsqueda",
        "component.library.elements": "Elementos",
        "component.library.enterSection": "Entrar en la sección",
        "component.library.error": "No se puede conectar con la fuente de activos",
        "component.library.loading": "Cargando...",
        "component.library.noItems": "No hay elementos",
        "component.library.noMoreItems": "No hay más elementos",
        "component.library.removeAssetConfirmation": "¿Desea eliminar permanentemente este activo?",
        "component.library.removeAssetConfirmation.description": "Esta acción no se puede deshacer.",
        "component.library.searchPlaceholder": "Buscar...",
        "component.librarySettings": "Bibliotecas",
        "component.librarySettings.elementLibrary": "Biblioteca de elementos",
        "component.librarySettings.imageLibrary": "Biblioteca de imágenes",
        "component.librarySettings.templateLibrary": "$t(component.templateLibrary)",
        "component.librarySettings.textLibrary": "Biblioteca de texto",
        "component.librarySettings.uploadLibrary": "Biblioteca de carga",
        "component.pageSettings": "Página",
        "component.pageSettings.format": "Formato de páginas",
        "component.pageSettings.manage": "Gestionar páginas",
        "component.pageTitleVisibilityToggle": "Título de página",
        "component.pageTitleVisibilityToggle.hide": "Ocultar",
        "component.pageTitleVisibilityToggle.hide.description": "Ocultar el título de la página",
        "component.pageTitleVisibilityToggle.show": "Mostrar",
        "component.pageTitleVisibilityToggle.show.description": "Mostrar el título de la página",
        "component.placeholder.create": "$t(common.placeholder)",
        "component.placeholder.settings": "Cambiar configuración de $t(common.placeholder)",
        "component.placeholder.settingsMenu": "Menú de configuración de $t(common.placeholder)",
        "component.replacePanelAutoCloseSettings": "Después de reemplazar",
        "component.replacePanelAutoCloseSettings.false": "Mantener abierto",
        "component.replacePanelAutoCloseSettings.false.description": "Mantener abierto el panel de la biblioteca de activos después de reemplazar un activo",
        "component.replacePanelAutoCloseSettings.true": "Cerrar",
        "component.replacePanelAutoCloseSettings.true.description": "Cerrar el panel de la biblioteca de activos después de reemplazar un activo",
        "component.replacePanelFloatingSettings": "Comportamiento",
        "component.replacePanelFloatingSettings.fixed": "Fijo",
        "component.replacePanelFloatingSettings.fixed.description": "La biblioteca de reemplazo está fija junto al lienzo",
        "component.replacePanelFloatingSettings.floating": "Flotante",
        "component.replacePanelFloatingSettings.floating.description": "La biblioteca de reemplazo flota sobre el lienzo",
        "component.roleSelect": "$t(common.role)",
        "component.roleSelect.description": "Seleccionar $t(common.role)",
        "component.scalingSelect": "Escalado de IU",
        "component.scalingSelect.large": "Grande",
        "component.scalingSelect.large.description": "Seleccionar escalado grande",
        "component.scalingSelect.normal": "Normal",
        "component.scalingSelect.normal.description": "Seleccionar escalado normal",
        "component.settings.toggle": "Personalizar editor",
        "component.settings.toggle.description": "Abrir configuraciones para personalizar el editor",
        "component.settingsPanel.appearance": "Apariencia",
        "component.settingsPanel.assetPanel": "Panel de biblioteca",
        "component.settingsPanel.dock": "Barra de herramientas",
        "component.settingsPanel.documentation": "Documentación",
        "component.settingsPanel.general": "General",
        "component.settingsPanel.header": "Personalizar editor",
        "component.settingsPanel.inspectorPanel": "Panel de inspector",
        "component.settingsPanel.replacePanel": "Panel de reemplazo",
        "component.themeSelect": "Tema",
        "component.themeSelect.dark": "Oscuro",
        "component.themeSelect.dark.description": "Seleccionar tema oscuro",
        "component.themeSelect.dialog": "Propiedades generadas por CSS",
        "component.themeSelect.dialog.description": "$t(component.themeSelect.dialog)",
        "component.themeSelect.generate": "Generar CSS",
        "component.themeSelect.light": "Claro",
        "component.themeSelect.light.description": "Seleccionar tema claro",
        "component.timeline.audio.options.description": "Opciones de elemento de audio",
        "component.timeline.pause.description": "$t(common.pause) video completo",
        "component.timeline.play.description": "$t(common.play) video completo",
        "component.timeline.scale.down": "Reducir",
        "component.timeline.scale.down.description": "Reducir la escala de la línea de tiempo",
        "component.timeline.scale.label": "Escala de la línea de tiempo",
        "component.timeline.scale.up": "Ampliar",
        "component.timeline.scale.up.description": "Ampliar la escala de la línea de tiempo",
        "component.timeline.video.options.description": "Opciones de elemento de video",
        "component.topbar.back": "$t(common.back)",
        "component.topbar.close": "$t(common.close)",
        "component.undo.redo": "$t(common.redo)",
        "component.undo.undo": "$t(common.undo)",
        "component.video.properties": "Propiedades de video",
        "component.video.source": "Original",
        "component.video.trim": "Recortar video",
        "component.video.trim.description": "Ajustar el recorte de video",
        "component.video.trim.duration": "Duración de recorte",
        "component.video.trim.duration.description": "Establecer la duración del video recortado",
        "component.video.trim.play": "$t(common.play)",
        "component.video.trim.play.description": "$t(common.play) video recortado",
        "component.video.unsupported": "Video no compatible",
        "component.video.unsupported.description": "<p>No admitimos la edición de video para su navegador actual en este momento.</p><p>Aunque estamos trabajando para admitir todos los navegadores principales, utilice un navegador compatible como la última versión de Google Chrome, Microsoft Edge u otro navegador basado en Chromium.</p>",
        "component.viewSelect": "Vista",
        "component.viewSelect.advanced": "Avanzada",
        "component.viewSelect.advanced.description": "Mostrar siempre el inspector",
        "component.viewSelect.default": "Predeterminada",
        "component.viewSelect.default.description": "Ocultar el inspector si es posible",
        "component.welcome.text": "<p>Bienvenido a CE.SDK.</p><p>Sé creativo agregando una <strong>Imagen</strong>, <strong>Texto</strong> o <strong>Elemento</strong> desde la biblioteca de activos.</p>",
        "component.zoom.autoFit": "Ajuste automático de la página",
        "component.zoom.fitPage": "Ajustar a la página",
        "component.zoom.fitSelection": "Ajustar a la selección",
        "component.zoom.in": "Acercar",
        "component.zoom.label.auto": "Automático",
        "component.zoom.options": "Ver más opciones de zoom",
        "component.zoom.out": "Alejar",
        "component.zoom.shortcut": "o presione {{shortcut}}",
        "component.zoom.to": "Zoom al {{percentage}}%",
        "element.transform.resize": "$t(action.block.resize)",
        "element.transform.rotate": "$t(action.block.rotate)",
        "error.applyAsset": "Error al aplicar el activo",
        "error.applyAsset.description": "Encontramos un error al intentar aplicar el activo",
        "error.cta.generic": "Error",
        "error.cta.generic.description": "La acción ha encontrado un error desconocido. Inténtalo de nuevo.",
        "error.generic": "Error desconocido",
        "error.generic.description": "La aplicación ha encontrado un error desconocido. Intente recargar la página",
        "error.replaceAsset": "Error al reemplazar el activo",
        "error.replaceAsset.description": "Encontramos un error al intentar reemplazar el activo",
        "error.upload": "No se puede cargar el archivo",
        "error.upload.description": "El archivo no se pudo cargar",
        "error.upload.sizeExceeded": "El archivo supera el tamaño máximo de {{limit}}x{{limit}}",
        "input.adjustments": "Ajustes",
        "input.adjustments.basic": "Básico",
        "input.adjustments.refinements": "Refinamientos",
        "input.adjustments.tooltip": "Cambiar ajustes",
        "input.alwaysOnTop": "Fijado al frente",
        "input.appearance": "Apariencia",
        "input.aspectLock": "Bloqueo de proporciones",
        "input.aspectLock.description": "Alternar bloqueo de proporciones",
        "input.audio.duration.description": "Duración del audio",
        "input.audio.duration.reset": "Restablecer duración del audio",
        "input.audio.mute": "Silenciar audio",
        "input.bleedMargin.select": "Seleccionar márgenes de sangrado",
        "input.blur": "Desenfoque",
        "input.blur.tooltip": "Cambiar desenfoque",
        "input.booleanoperations": "Combinar recortes",
        "input.booleanoperations.exclude": "Excluir",
        "input.booleanoperations.intersect": "Intersectar",
        "input.booleanoperations.subtract": "Restar",
        "input.booleanoperations.union": "Unir",
        "input.canvas": "Lienzo",
        "input.colorMode": "Modo de color",
        "input.colorMode.description": "Elegir el modo de color",
        "input.character": "Carácter",
        "input.clipContent": "Recortar contenido",
        "input.clipContent.off.description": "Desactivar el recorte de contenido",
        "input.clipContent.on.description": "Activar el recorte de contenido",
        "input.clipLines": "Recortar líneas",
        "input.clipLines.on.description": "Recortar líneas activado",
        "input.clipLines.off.description": "Recortar líneas desactivado",
        "input.cutoutOffset": "Desplazamiento",
        "input.cutoutSmoothing": "Suavizado",
        "input.cutoutType": "Tipo",
        "input.cutoutType.dashed": "Perforado",
        "input.cutoutType.solid": "Recortar",
        "input.duration": "Duración",
        "input.duration.description": "Duración en segundos",
        "input.effect": "Efecto",
        "input.effect.tooltip": "Cambiar efecto",
        "input.export": "Exportar",
        "input.filter": "Filtro",
        "input.filter.tooltip": "Cambiar filtro",
        "input.fontSelect": "Fuente seleccionada: {{font}}",
        "input.fontSelect.fallback": "Estándar",
        "input.fontSelect.tooltip": "Cambiar estilo de fuente",
        "input.fontSize.select": "Seleccionar tamaño de fuente",
        "input.fontSize.selectMax": "input.fontSize.selectMax",
        "input.fontSize.selectMin": "input.fontSize.selectMin",
        "input.fontStyle.toggle": "Alternar estilo {{style}}",
        "input.gradient.activateColorStop": "Presione espacio para activar",
        "input.gradient.colorPosition": "Posición del color",
        "input.gradient.colorStop": "Punto de color",
        "input.gradient.colorStop.active": "Punto de color activo",
        "input.gradient.colorStop.description": "{{stopType}} {{index}} de {{total}} en {{position}}%. $t(common.nearestColorName): {{colorName}}, $t(common.colorValue): {{colorValue}}.{{action}}",
        "input.gradient.flip": "Invertir orden de parada de color del degradado",
        "input.gradient.gradientAngle": "Ángulo de degradado",
        "input.gradient.rotate": "Girar el degradado 45 grados en el sentido de las agujas del reloj",
        "input.hspSelectiveAdjustments": "Ajustes selectivos de HSP",
        "input.insertVariable": "Insertar variable",
        "input.keyShortcut": "Para abrir '{{input}}', presione '{{keyShortcut}}",
        "input.layer": "Capa",
        "input.multiSelection.notice": "input.multiSelection.notice",
        "is not supported yet\"": "no es compatible aún\"",
        "gleichzeitig bearbeitet werden\"": "gleichzeitig bearbeitet werden\"",
        "input.multiSelection.title": "Elementos múltiples ({{count}})",
        "input.options": "Opciones",
        "input.options.description": "Más opciones",
        "input.page.titleTemplate": "",
        "input.pages": "Páginas",
        "input.preset": "Formato",
        "input.preset.description": "Preset de formato de página",
        "input.preset.tooltip": "Seleccionar $t(input.preset)",
        "input.propertyToggle.disable": "Deshabilitar {{property}}",
        "input.propertyToggle.enable": "Habilitar {{property}}",
        "input.propertyToggle.hidden": "Oculto",
        "input.propertyToggle.visible": "Visible",
        "input.rename": "Cambiar nombre de {{designElementName}}",
        "input.resolution.select": "Seleccionar {{which}}",
        "input.shadow.angle": "Ángulo",
        "input.shadow.angle.description": "Ángulo de la sombra",
        "input.shadow.blur": "Desenfoque",
        "input.shadow.blur.description": "Desenfoque de la sombra",
        "input.shadow.distance": "Distancia",
        "input.shadow.distance.description": "Distancia de la sombra",
        "input.shadow.label": "Sombra",
        "input.shadow.valueLabel": "Sombra difuminada",
        "input.shape": "Forma",
        "input.shape.options": "Opciones de forma",
        "input.showInExport": "Mostrar en la exportación",
        "input.sliderInput.toggleNumberInput": "Mostrar entrada de valor directo",
        "input.text.advanced": "$t(common.advanced)",
        "input.text.advanced.description": "Interlineado, espaciado, alineación y dimensiones",
        "input.text.placeholder": "Escribir algo",
        "input.time.end": "Fin del tiempo",
        "input.time.start": "Inicio del tiempo",
        "input.transform": "$t(common.position) y $t(common.size)",
        "input.transform.description": "Ajustar posición y tamaño",
        "input.typefaceSelect.description": "Tipo de fuente seleccionado: {{fontFamily}}",
        "input.typefaceSelect.tooltip": "Cambiar tipo de fuente",
        "input.unit.tooltip": "Seleccionar $t(common.unit)",
        "input.uploadAudio": "Subiendo audio...",
        "input.uploadFiles": "Subiendo archivos...",
        "input.uploadImage": "Subiendo imagen...",
        "input.uploadVideo": "Subiendo video...",
        "input.video": "Video",
        "input.video.duration.description": "Duración del video",
        "input.video.duration.reset": "Restablecer duración del video",
        "libraries.ly.img.audio.label": "Audio",
        "libraries.ly.img.audio.upload.label": "Cargas de audio",
        "libraries.ly.img.colors.defaultPalette.label": "Paleta de colores predeterminada",
        "libraries.ly.img.image.label": "Imágenes",
        "libraries.ly.img.image.upload.label": "Cargas de imágenes",
        "libraries.ly.img.local.label": "Local",
        "libraries.ly.img.sticker.doodle.label": "Garabato",
        "libraries.ly.img.sticker.emoji.label": "Emoji",
        "libraries.ly.img.sticker.emoticons.label": "Emoticonos",
        "libraries.ly.img.sticker.hand.label": "Manos",
        "libraries.ly.img.sticker.label": "Stickers",
        "libraries.ly.img.template.confirmation.abort": "$t(common.cancel)",
        "libraries.ly.img.template.confirmation.confirm": "Sí, descartar cambios",
        "libraries.ly.img.template.confirmation.body": "Tu contenido, como imágenes y texto, no se puede adoptar y se descartará todo el contenido.",
        "libraries.ly.img.template.confirmation.headline": "¿Reemplazar el diseño actual?",
        "libraries.ly.img.template.label": "Plantillas",
        "libraries.ly.img.text.headline.label": "Título",
        "libraries.ly.img.text.label": "Texto",
        "libraries.ly.img.text.paragraph.label": "Párrafo",
        "libraries.ly.img.text.title.label": "Título",
        "libraries.ly.img.upload.label": "Subir",
        "libraries.ly.img.vectorpath.abstract.label": "Abstracto",
        "libraries.ly.img.vectorpath.label": "Formas",
        "libraries.ly.img.vectorpath.vectorpaths.label": "Básico",
        "libraries.ly.img.video.label": "Videos",
        "libraries.ly.img.video.upload.label": "Cargas de video",
        "libraries.unsplash.label": "Unsplash",
        "notification.redo": "$t(common.redo)",
        "notification.undo": "$t(common.undo)",
        "preset.document.american-legal": "Legal",
        "preset.document.american-letter": "Carta",
        "preset.document.business-card": "Tarjeta de visita",
        "preset.document.custom": "Personalizado",
        "preset.document.din-a0": "DIN A0",
        "preset.document.din-a1": "DIN A1",
        "preset.document.din-a2": "DIN A2",
        "preset.document.din-a3": "DIN A3",
        "preset.document.din-a4": "DIN A4",
        "preset.document.din-a5": "DIN A5",
        "preset.document.din-a6": "DIN A6",
        "preset.document.din-a65": "DIN A6/5",
        "preset.document.din-b5": "DIN B5",
        "preset.document.format2k": "Video 2k 1080P 1:1.77",
        "preset.document.format4k": "4K (Ultra HD) 4K / 2160p 16:9",
        "preset.document.fullhd": "Full HD (FHD) 1080p 16:9",
        "preset.document.hd": "HD (High Definition) 720p 16:9",
        "preset.document.instagram-photo": "Foto de Instagram",
        "preset.document.instagram-profile": "Perfil de Instagram",
        "preset.document.instagram-story": "Historia de Instagram",
        "preset.document.qhd": "QHD (Quad HD) 1440p 16:9",
        "preset.document.social-feed": "Feed de redes sociales",
        "preset.document.social-story": "Historia / Reel",
        "preset.document.square": "Cuadrado",
        "preset.document.twitter-header": "Encabezado de Twitter",
        "preset.document.twitter-image": "Imagen de Twitter",
        "preset.document.twitter-profile": "Perfil de Twitter",
        "preset.template.blank_1": "En blanco",
        "preset.template.business_card_1": "Tarjeta de visita",
        "preset.template.collage_1": "Collage",
        "preset.template.instagram_photo_1": "Foto de Instagram",
        "preset.template.instagram_story_1": "Historia de Instagram",
        "preset.template.postcard_1": "Postal 1",
        "preset.template.postcard_2": "Postal 2",
        "preset.template.poster_1": "Póster",
        "preset.template.presentation_4": "Presentación",
        "property.adjustments.blacks": "Negros",
        "property.adjustments.brightness": "Brillo",
        "property.adjustments.clarity": "Claridad",
        "property.adjustments.contrast": "Contraste",
        "property.adjustments.exposure": "Exposición",
        "property.adjustments.gamma": "Gamma",
        "property.adjustments.highlights": "Destacados",
        "property.adjustments.saturation": "Saturación",
        "property.adjustments.shadows": "Sombras",
        "property.adjustments.sharpness": "Nitidez",
        "property.adjustments.temperature": "Temperatura",
        "property.adjustments.whites": "Blancos",
        "property.autoSize": "Tamaño del marco",
        "property.autoSize.autoHeight.description": "Ajustar automáticamente la altura del marco de texto",
        "property.autoSize.fixedFrame.description": "Mantener el marco de texto",
        "property.backgroundColor": "Color de fondo",
        "property.backgroundColor.description": "Cambiar el color de fondo",
        "property.bleedMargin": "Margen de sangrado",
        "property.blendMode": "Modo de mezcla",
        "property.blendMode.Color": "Color",
        "property.blendMode.ColorBurn": "Sobreexposición de color",
        "property.blendMode.ColorDodge": "Subexposición de color",
        "property.blendMode.Darken": "Oscurecer",
        "property.blendMode.description": "Modo de mezcla seleccionado: {{mode}}",
        "property.blendMode.Difference": "Diferencia",
        "property.blendMode.Exclusion": "Exclusión",
        "property.blendMode.HardLight": "Luz fuerte",
        "property.blendMode.Hue": "Matiz",
        "property.blendMode.Lighten": "Aclarar",
        "property.blendMode.Luminosity": "Luminosidad",
        "property.blendMode.Multiply": "Multiplicar",
        "property.blendMode.Normal": "Normal",
        "property.blendMode.Overlay": "Superponer",
        "property.blendMode.PassThrough": "Pasar a través",
        "property.blendMode.Saturation": "Saturación",
        "property.blendMode.Screen": "Pantalla",
        "property.blendMode.SoftLight": "Luz suave",
        "property.blendMode.tooltip": "Cambiar el modo de mezcla",
        "property.blur.extrudeBlur": "Desenfoque en relieve",
        "property.blur.extrudeBlur.amount": "Intensidad",
        "property.blur.linearBlur": "Desenfoque lineal",
        "property.blur.linearBlur.blurRadius": "Intensidad",
        "property.blur.linearBlur.x1": "Punto 1 - X",
        "property.blur.linearBlur.x2": "Punto 2 - X",
        "property.blur.linearBlur.y1": "Punto 1 - Y",
        "property.blur.linearBlur.y2": "Punto 2 - Y",
        "property.blur.mirroredBlur": "Desenfoque en espejo",
        "property.blur.mirroredBlur.blurRadius": "Intensidad",
        "property.blur.mirroredBlur.gradientSize": "Tamaño del degradado",
        "property.blur.mirroredBlur.size": "Tamaño de área no desenfocada",
        "property.blur.mirroredBlur.x1": "Punto 1 - X",
        "property.blur.mirroredBlur.x2": "Punto 2 - X",
        "property.blur.mirroredBlur.y1": "Punto 1 - Y",
        "property.blur.mirroredBlur.y2": "Punto 2 - Y",
        "property.blur.radialBlur": "Desenfoque radial",
        "property.blur.radialBlur.blurRadius": "Intensidad",
        "property.blur.radialBlur.gradientRadius": "Tamaño del degradado",
        "property.blur.radialBlur.radius": "Tamaño de área no desenfocada",
        "property.blur.radialBlur.x": "Punto - X",
        "property.blur.radialBlur.y": "Punto - Y",
        "property.blur.uniformBlur": "Desenfoque gaussiano",
        "property.blur.uniformBlur.intensity": "Intensidad",
        "property.color": "Color",
        "property.color.description": "Cambiar color",
        "property.crop": "Recortar",
        "property.crop.offset": "Desplazamiento {{axis}}",
        "property.crop.offset.description": "Desplazamiento de recorte en el eje {{axis}} en {{unit}}",
        "property.crop.scale": "Escala",
        "property.crop.scale.description": "Escalar proporcionalmente las dimensiones de la imagen",
        "property.crop.size": "Área de recorte",
        "property.crop.size.description": "{{dimension}} del marco de recorte en {{unit}}",
        "property.crop.straighten": "Enderezar",
        "property.crop.tooltip": "Cambiar propiedades de recorte",
        "property.crop.transform": "$t(block.image)",
        "property.duotoneFilter.breezy": "Tonos Breezy",
        "property.duotoneFilter.clash": "Tonos Clash",
        "property.duotoneFilter.deepblue": "Tonos Deep Blue",
        "property.duotoneFilter.desert": "Tonos Desert",
        "property.duotoneFilter.frog": "Tonos Frog",
        "property.duotoneFilter.peach": "Tonos Peach",
        "property.duotoneFilter.plum": "Tonos Plum",
        "property.duotoneFilter.sunset": "Tonos Sunset",
        "property.duoToneFilterIntensity": "Intensidad",
        "property.effect.colorCut.amount": "Intensidad",
        "property.effect.colorCut.speed": "Sensibilidad",
        "property.effect.colorCut.time": "Variación",
        "property.effect.crossCut": "Corte cruzado",
        "property.effect.crossCut.offset": "Desplazamiento horizontal",
        "property.effect.crossCut.slices": "Cortes horizontales",
        "property.effect.crossCut.speedV": "Desplazamiento vertical",
        "property.effect.crossCut.time": "Variación",
        "property.effect.dotPattern": "Patrón de puntos",
        "property.effect.dotPattern.blur": "Desenfoque global",
        "property.effect.dotPattern.dots": "Número de puntos",
        "property.effect.dotPattern.size": "Tamaño de puntos",
        "property.effect.extrudeBlur": "Desenfoque en relieve",
        "property.effect.extrudeBlur.amount": "Intensidad",
        "property.effect.glow": "Brillo",
        "property.effect.glow.amount": "Intensidad",
        "property.effect.glow.darkness": "Oscurecimiento",
        "property.effect.glow.size": "Brillo",
        "property.effect.halfTone": "Semitonos",
        "property.effect.halfTone.angle": "Ángulo del patrón",
        "property.effect.halfTone.scale": "Escala del patrón",
        "property.effect.joggle.amount": "Severidad",
        "property.effect.joggle.time": "Variación",
        "property.effect.linocut": "Linograbado",
        "property.effect.linocut.scale": "Escala del patrón",
        "property.effect.liquid": "Líquido",
        "property.effect.liquid.amount": "Intensidad",
        "property.effect.liquid.scale": "Escala",
        "property.effect.liquid.speed": "Sensibilidad",
        "property.effect.liquid.time": "Variación",
        "property.effect.mirror": "Espejo",
        "property.effect.mirror.side": "Lado espejado",
        "property.effect.outliner": "Contorno",
        "property.effect.outliner.amount": "Intensidad",
        "property.effect.outliner.passthrough": "Mezcla",
        "property.effect.pixelize": "Pixelización",
        "property.effect.pixelize.horizontalPixelSize": "Cuenta horizontal",
        "property.effect.pixelize.verticalPixelSize": "Cuenta vertical",
        "property.effect.posterize": "Posterización",
        "property.effect.posterize.levels": "Número de niveles",
        "property.effect.psychedelic.amount": "Intensidad",
        "property.effect.psychedelic.offset": "Desplazamiento diagonal",
        "property.effect.psychedelic.time": "Variación",
        "property.effect.radialPixel": "Píxeles radiales",
        "property.effect.radialPixel.radius": "Radio por fila",
        "property.effect.radialPixel.segments": "Tamaño por fila",
        "property.effect.radiate.centerBrightness": "Brillo en el centro",
        "property.effect.radiate.colorize": "Saturación",
        "property.effect.radiate.powerCurve": "Intensidad",
        "property.effect.scanlines.count": "Altura de línea",
        "property.effect.scanlines.linesAmount": "Intensidad de líneas",
        "property.effect.scanlines.noiseAmount": "Ruido aplicado",
        "property.effect.scanlines.time": "Variación",
        "property.effect.separate.amount": "Desplazamiento",
        "property.effect.separate.time": "Variación",
        "property.effect.sharpie": "Marcador",
        "property.effect.shifter": "Desplazador",
        "property.effect.shifter.amount": "Distancia",
        "property.effect.shifter.angle": "Dirección de desplazamiento",
        "property.effect.tiltShift": "Efecto Tiltshift",
        "property.effect.tiltShift.amount": "Intensidad",
        "property.effect.tiltShift.position": "Posición",
        "property.effect.tvGlitch": "Glitch de TV",
        "property.effect.tvGlitch.distortion": "Distorsión áspera",
        "property.effect.tvGlitch.distortion2": "Distorsión fina",
        "property.effect.tvGlitch.rollSpeed": "Desplazamiento vertical",
        "property.effect.tvGlitch.speed": "Variación",
        "property.effect.tvGlitch.time": "Variación",
        "property.effect.vignette": "Viñeta",
        "property.effect.vignette.darkness": "Color",
        "property.effect.vignette.offset": "Tamaño",
        "property.effect.waves.size": "Tamaño del patrón",
        "property.effect.waves.speed": "Sensibilidad",
        "property.effect.waves.strength": "Intensidad",
        "property.effect.waves.time": "Variación",
        "property.fill": "Relleno",
        "property.fill.description": "Cambiar relleno",
        "property.fillType": "Tipo de relleno",
        "property.fillType.gradient": "Degradado",
        "property.fillType.gradient.description": "Usar relleno de degradado",
        "property.fillType.solid": "Sólido",
        "property.fillType.solid.description": "Usar color de relleno sólido",
        "property.flip": "Voltear",
        "property.flip.x": "Voltear horizontalmente",
        "property.flip.y": "Voltear verticalmente",
        "property.gradientType.conical": "Degradado cónico",
        "property.gradientType.linear": "Degradado lineal",
        "property.gradientType.radial": "Degradado radial",
        "property.hspSelectiveAdjustments.hue": "Tono",
        "property.hspSelectiveAdjustments.perceivedBrightness": "Brillo percibido",
        "property.hspSelectiveAdjustments.saturation": "Saturación",
        "property.innerDiameter": "Diámetro interno",
        "property.layout": "Diseño",
        "property.layout.horizontal": "Organizar páginas horizontalmente",
        "property.layout.vertical": "Organizar páginas verticalmente",
        "property.letterSpacing": "Espaciado de letras",
        "property.lineHeight": "Altura de línea",
        "property.lineWidth": "Ancho de línea",
        "property.lineWidth.description": "Cambiar el ancho de línea",
        "property.lutFilter.ad1920": "1920 D.C.",
        "property.lutFilter.ancient": "Antiguo",
        "property.lutFilter.bleached": "Kalmen",
        "property.lutFilter.bleachedblue": "Joran",
        "property.lutFilter.blues": "Polaroid",
        "property.lutFilter.blueshadows": "Zephyr",
        "property.lutFilter.breeze": "Levante",
        "property.lutFilter.bw": "En gris",
        "property.lutFilter.celsius": "Infierno",
        "property.lutFilter.chest": "Castaño",
        "property.lutFilter.classic": "Clásico",
        "property.lutFilter.colorful": "Colorido",
        "property.lutFilter.cool": "Ágil",
        "property.lutFilter.cottoncandy": "Algodón de azúcar",
        "property.lutFilter.creamy": "Cremoso",
        "property.lutFilter.eighties": "Fuego bajo",
        "property.lutFilter.elder": "Colla",
        "property.lutFilter.evening": "Amanecer",
        "property.lutFilter.fall": "Musgo",
        "property.lutFilter.fixie": "Fixie",
        "property.lutFilter.food": "Comida",
        "property.lutFilter.fridge": "Nevera",
        "property.lutFilter.front": "Años 70 soleados",
        "property.lutFilter.glam": "Glamour",
        "property.lutFilter.gobblin": "Gobblin",
        "property.lutFilter.highcarb": "Alto en carbohidratos",
        "property.lutFilter.highcontrast": "Hicon",
        "property.lutFilter.k1": "K1",
        "property.lutFilter.k2": "Negro sólido",
        "property.lutFilter.k6": "K6",
        "property.lutFilter.kdynamic": "Guijarro",
        "property.lutFilter.keen": "Agudo",
        "property.lutFilter.lenin": "Limón",
        "property.lutFilter.litho": "Litografía",
        "property.lutFilter.lomo": "Lomo",
        "property.lutFilter.lomo100": "Lomo 100",
        "property.lutFilter.lucid": "Lúcido",
        "property.lutFilter.mellow": "Tranquilo",
        "property.lutFilter.neat": "Ordenado",
        "property.lutFilter.nogreen": "Calabaza",
        "property.lutFilter.orchid": "Solanus",
        "property.lutFilter.pale": "Pálido",
        "property.lutFilter.pitched": "Tono",
        "property.lutFilter.plate": "Desgastado",
        "property.lutFilter.pola669": "Espacio verde",
        "property.lutFilter.polasx": "Pola SX",
        "property.lutFilter.pro400": "Pro 400",
        "property.lutFilter.quozi": "Quozi",
        "property.lutFilter.sepiahigh": "Sepia",
        "property.lutFilter.settled": "Establecido",
        "property.lutFilter.seventies": "Años 70",
        "property.lutFilter.sin": "Cosas difíciles",
        "property.lutFilter.soft": "Suave",
        "property.lutFilter.steel": "Acero",
        "property.lutFilter.summer": "Verano",
        "property.lutFilter.sunset": "Dorado",
        "property.lutFilter.tender": "Tierno",
        "property.lutFilter.texas": "Antiguo",
        "property.lutFilter.twilight": "Crepúsculo",
        "property.lutFilter.winter": "Suave",
        "property.lutFilter.x400": "Polvoriento",
        "property.lutFilterIntensity": "Intensidad de filtro LUT",
        "property.opacity": "Opacidad",
        "property.orientation": "Orientación",
        "property.orientation.description": "Establecer la orientación de la página a {{orientation}}",
        "property.orientation.flip": "Voltear orientación",
        "property.orientation.landscape": "Horizontal",
        "property.orientation.portrait": "Vertical",
        "property.orientation.square": "Cuadrado",
        "property.outlineColor": "Color del contorno",
        "property.outlineWidth": "Ancho del contorno",
        "property.paragraphSpacing": "Espaciado de párrafo",
        "property.placeholderBehavior.description": "Actuar como marcador de posición",
        "property.points": "Puntos",
        "property.position": "{{axis}} $t(common.position)",
        "property.position.description": "Posición en el eje {{axis}} en {{unit}}",
        "property.sides": "Lados",
        "property.strokeColor": "Color del trazo",
        "property.strokeColor.description": "Cambiar el color del trazo",
        "property.strokeCornerGeometry": "Unir",
        "property.strokeCornerGeometry.bevel": "Biselado",
        "property.strokeCornerGeometry.description": "Cambiar el estilo de unión del trazo",
        "property.strokeCornerGeometry.miter": "A inglete",
        "property.strokeCornerGeometry.round": "Redondeado",
        "property.strokePosition": "$t(common.position)",
        "property.strokePosition.center": "Centro",
        "property.strokePosition.description": "Cambiar la posición del trazo",
        "property.strokePosition.inner": "Interior",
        "property.strokePosition.outer": "Exterior",
        "property.strokePositionAndCornerGeometry": "$t(property.strokePosition) y $t(property.strokeCornerGeometry)",
        "property.strokePositionAndCornerGeometry.description": "Cambiar la posición del trazo y el estilo de unión",
        "property.strokeStyle": "Estilo",
        "property.strokeStyle.dashed": "Discontinuo",
        "property.strokeStyle.dashedRound": "Discontinuo redondeado",
        "property.strokeStyle.description": "Cambiar el estilo del trazo",
        "property.strokeStyle.dotted": "Punteado",
        "property.strokeStyle.longDashed": "Discontinuo largo",
        "property.strokeStyle.longDashedRound": "Discontinuo largo redondeado",
        "property.strokeStyle.solid": "Sólido",
        "property.strokeWidth": "Ancho del trazo",
        "property.strokeWidth.description": "Cambiar el ancho del trazo",
        "property.textAlignment.horizontal": "Alineación horizontal",
        "property.textAlignment.horizontal.center": "Alinear texto al centro",
        "property.textAlignment.horizontal.description": "Cambiar la alineación horizontal",
        "property.textAlignment.horizontal.left": "Alinear texto a la izquierda",
        "property.textAlignment.horizontal.right": "Alinear texto a la derecha",
        "property.textAlignment.vertical": "Alineación vertical",
        "property.textAlignment.vertical.bottom": "Alinear texto en la parte inferior",
        "property.textAlignment.vertical.center": "Alinear texto en el centro",
        "property.textAlignment.vertical.top": "Alinear texto en la parte superior",
        "property.textCase": "Caso de texto",
        "property.textCase.lowercase": "Minúsculas",
        "property.textCase.normal": "Sin cambios",
        "property.textCase.titlecase": "Mayúsculas iniciales",
        "property.textCase.uppercase": "Mayúsculas",
        "property.volume": "Volumen",
        "scope.content.replace": "Permitir reemplazar contenido",
        "scope.design.arrange": "Permitir organizar",
        "scope.design.arrange.flip": "Permitir voltear",
        "scope.design.arrange.move": "Permitir mover",
        "scope.design.arrange.resize": "Permitir cambiar el tamaño",
        "scope.design.arrange.rotate": "Permitir rotar",
        "scope.layer.crop": "Permitir recortar",
        "scope.design.style": "Permitir estilizar",
        "scope.editor.select": "Permitir seleccionar",
        "scope.lifecycle.destroy": "Permitir eliminar",
        "scope.lifecycle.duplicate": "Permitir duplicar",
        "typography.autoSize": "Autoajuste",
        "typography.autoSize.abbreviation": "Auto",
        "typography.bold": "Negrita",
        "typography.italic": "Cursiva",
        "typography.normal": "Normal",
        "typography.size": "Tamaño",
        "typography.sizeRange": "Rango de tamaño",
        "typography.style": "Estilo",
        "typography.typeface": "Tipo de letra",
        "typography.weight.100": "Fino",
        "typography.weight.200": "Extra ligero",
        "typography.weight.300": "Ligero",
        "typography.weight.400": "Regular",
        "typography.weight.500": "Medio",
        "typography.weight.600": "Seminegrita",
        "typography.weight.700": "Negrita",
        "typography.weight.800": "Extra negrita",
        "typography.weight.900": "Negro",
        "variables.address.label": "Dirección",
        "variables.city.label": "Ciudad",
        "variables.company_name.label": "Empresa",
        "variables.first_name.label": "Nombre",
        "variables.last_name.label": "Apellido",
        "warning.invalidType": "Tipo inválido: No se permite el tipo de archivo",




      }
    },
    callbacks: {
      onUpload:'local',
      onUnsupportedBrowser: () => {
        /* This is the default window alert which will be shown in case an unsupported
         * browser tries to run CE.SDK */
        window.alert(
          'Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer'
        );
      },
      onBack: () => {
        window.alert('Back callback!');
      },
      onClose: () => {
        window.alert('Close callback!');
      },
      onSave: (scene: any ) => {
        window.alert('Save callback!');
        console.info(scene);

        if (this.imageCodes.length >= this.imageCodeIndex + 1) {
          // Si hay un elemento en la posición actual, sobrescríbelo
          this.imageCodes[this.imageCodeIndex] = scene;
        } else {
          // Si no hay un elemento en la posición actual, agrégalo al final
          this.imageCodes.push(scene);
        }
        this.bbb = true;
      },
      onLoad: () => {
        window.alert('Load callback!');
        const scene = ''; // Fill with sene
        return Promise.resolve(scene);

      },
      onExport: async (blobs: any[], opciones: any) => {
        window.alert('Export callback!');
        this.ccc = true;

        console.log('index callback', this.imageblobIndex);

        // Obtén el Blob de la imagen
        const imageBlob = blobs[0];
        console.log('index', this.imageblobIndex);
        console.log('blob', imageBlob);

        // Convierte el Blob a base64
        const base64String = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);

        });

        console.log('Código base64 de la imagen:', base64String);

        this.prevCode[this.imageblobIndex]=base64String;

        console.log('index', this.imageblobIndex);

        console.log('imagen', this.prevCode[this.imageblobIndex]);

        console.log('index', this.imageblobIndex);
        return Promise.resolve();
      }



    },
    //Agregar quiz
    ui: {
      // docs-ui-elements
      elements: {
        // docs-ui-view
        view: "default", // 'default' or 'advanced'
        // docs-ui-view
        // docs-ui-navigation
        navigation: {
          show: true, // 'false' to hide the navigation completely

          // docs-ui-actions
          action: {
            close: false, // true or false
            back: false, // true or false
            load: false, // true or false
            save: false, // true or false
            export: {
              show: true,
              format: ["image/png"]
            },
            download: false, // true  or false
            // docs-ui-actions
            // docs-ui-custom-actions
            custom: [
              {
                label: "common.custom", // string or i18n key
                iconName: "default", // one of 'default', 'download', 'upload', or 'save'
                callback: () => {
                  // callback signature is `() => void | Promise<void>`
                  // place custom functionality here
                }
              }
            ]
            // docs-ui-custom-actions
          }
        },
        // docs-ui-navigation
        // docs-ui-panels
        panels: {


          settings: {
            show: false // true or false
          }
        },
        // docs-ui-panels
        // docs-ui-dock
        dock: {
          iconSize: "large", // 'large' or 'normal'
          hideLabels: false, // false or true
          groups: [
            {
              id: "ly.img.template", // string
              entryIds: ["ly.img.template"] // string[]
            },
            {
              id: "ly.img.defaultGroup", // string
              showOverview: true // true or false
            }
          ],
          defaultGroupId: "ly.img.defaultGroup" // string
        },
        // docs-ui-dock
        // docs-ui-libraries
        libraries: {
          insert: {

          },
          replace: {

          }
        },
        // docs-ui-libraries
        // docs-ui-blocks
        blocks: {
          opacity: false, // true  or false
          transform: false, // true  or false
          "//ly.img.ubq/image": {
            adjustments: true, // true  or false
            filters: false, // true  or false
            effects: false, // true  or false
            blur: true, // true  or false
            crop: false // true  or false
          },
          // docs-ui-pages
          "//ly.img.ubq/page": {
            manage: false,
            format: true,
            maxDuration: 30 * 60
          }
          // docs-ui-pages
        }
        // docs-ui-blocks
      }
      // docs-ui-elements


    },
  };

  protected readonly open = open;

  questions = [
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: ""
    },
    {
      lienzo: '',
      questionText: '',
      options: [
        { text: '', correct: true },
        { text: '' },
        { text: '' },
        { text: '' },
      ],
      palabraText: "",
      significado: ""
    },
  ];

  nextpage() {

    if (this.ccc) {

      this.guardarDatos()
      this.reiniciarFormulario();
      this.eliminarCampo();
      this.imageblobIndex=this.imageblobIndex+1;
      this.limpiarLienzo();
      this.page++;
      this.imageCodeIndex++; // Incrementar el índice cuando avanzas a la siguiente página
      this.ccc=false;
      console.log("index nuevo= ", this.imageblobIndex)
    } else {
       if (!this.ccc){
        window.alert('guardar antes de continuar!');
        this.ccc=false;
      }
    }
  }


  reiniciarFormulario() {
    // Itera sobre los grupos de palabras y establece los valores a cadenas vacías
    this.palabraGrupos.forEach(grupo => {
      grupo.get('palabra')?.setValue('');
      grupo.get('significado')?.setValue('');
    });
  }

  submitForm(index: number) {
    console.log('Datos del formulario(Preguntas):', this.questions[index]);
  }

  generateJSON() {
    if (this.ccc) {
      this.guardarDatos()
      // Obtén la ID de la historia desde el servicio compartido
      const storyId = this.sharedService.getStoryId();

      // Iterar sobre las preguntas y asignar el valor de "imageCodes" a la propiedad "lienzo"
      for (let i = 0; i < this.questions.length; i++) {        // Obtener el valor correspondiente de "imageCodes" (asegúrate de que haya suficientes elementos en el array)
        const imageCode = this.prevCode[i] || '';

        // Construir la pregunta con la propiedad "lienzo"
        const question = {
          lienzo: imageCode,
          questionText: this.questions[i].questionText,
          options: this.questions[i].options.map((option) => ({
            text: option.text,
            correct: option.correct,
          })),
          palabraText: this.AlmacenTotal[0][i+1],
          significado: this.AlmacenTotal[1][i+1],
          // Remover "casouso" ya que no se requiere
        };
        // Asignar la pregunta modificada de nuevo al arreglo de preguntas
        this.questions[i] = question;
      }

      // Resto del código para generar el JSON
      const jsonData = {
        questions: this.questions,
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      console.log('JSON generado:', jsonString);

      // Convertir la cadena JSON a base64
      const base64String = btoa(jsonString);

      // Asignar el resultado a la variable jsonConvertido
      this.jsonConvertido = base64String;
      console.log('Contenido codificado en base64:', this.jsonConvertido);
      console.log('prev code', this.prevCode[0])

      const activity: Activity = {
        jsonConverted: this.jsonConvertido,
        imgPreview: this.prevCode[0],
        storyId: storyId, // Usar la ID de la historia obtenida del servicio compartido
      };

      this.storiesService.assignActivityToStory(activity).subscribe(
        (assignedStory) => {
          console.log('Actividad asignada exitosamente a la historia:', assignedStory);
          this.router.navigate(['/historial']);
        },
        (error) => {
          console.error('Error al asignar actividad a la historia:', error);
        }
      );
    } else {
      window.alert('Guardar antes de seguir!');
      this.ccc = false;
    }
  }
  // Establece la propiedad 'correct' en true para la opción seleccionada
  updateCorrectOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.forEach((option, index) => {
      if (index === optionIndex) {
        option.correct = true;
      } else {
        option.correct = false;
      }
    });

  }
  limpiarLienzo() {
    // Agrega la lógica para limpiar el lienzo aquí
    // Puedes reiniciar la escena o realizar las operaciones necesarias para tener un lienzo en blanco.
    this.instance.createDesignScene();
  }


}





