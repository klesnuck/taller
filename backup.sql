--
-- PostgreSQL database dump
--

\restrict E1LczuM7obpeLQ1q8L66DuVAqXQ8izgNBZjHJ3l5UiL1JIEaMRqB4faC1Xd1GA7

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-28 01:33:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 229 (class 1259 OID 16614)
-- Name: anio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anio (
    idanio integer NOT NULL,
    anio integer
);


ALTER TABLE public.anio OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16613)
-- Name: anio_idanio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anio_idanio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anio_idanio_seq OWNER TO postgres;

--
-- TOC entry 5281 (class 0 OID 0)
-- Dependencies: 228
-- Name: anio_idanio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anio_idanio_seq OWNED BY public.anio.idanio;


--
-- TOC entry 248 (class 1259 OID 16806)
-- Name: cita; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cita (
    idcita integer NOT NULL,
    idcotizacion integer,
    idusuarios integer,
    fecha date,
    hora time without time zone,
    nota character varying(255),
    estado character varying(50) DEFAULT 'Pendiente'::character varying
);


ALTER TABLE public.cita OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 16805)
-- Name: cita_idcita_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cita_idcita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cita_idcita_seq OWNER TO postgres;

--
-- TOC entry 5282 (class 0 OID 0)
-- Dependencies: 247
-- Name: cita_idcita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cita_idcita_seq OWNED BY public.cita.idcita;


--
-- TOC entry 240 (class 1259 OID 16700)
-- Name: compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compra (
    numero_orden integer NOT NULL,
    idproveedor integer,
    estado_compra character varying(50),
    total numeric,
    estado_pago character varying(50),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.compra OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16699)
-- Name: compra_numero_orden_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compra_numero_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compra_numero_orden_seq OWNER TO postgres;

--
-- TOC entry 5283 (class 0 OID 0)
-- Dependencies: 239
-- Name: compra_numero_orden_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compra_numero_orden_seq OWNED BY public.compra.numero_orden;


--
-- TOC entry 242 (class 1259 OID 16718)
-- Name: cotizacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cotizacion (
    idcotizacion integer NOT NULL,
    idusuarios integer,
    idvehiculos integer,
    idservicios integer,
    idproductos integer,
    total_estimado numeric,
    fecha character varying(50),
    detalles text,
    estado character varying(50) DEFAULT 'Pendiente'::character varying
);


ALTER TABLE public.cotizacion OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16717)
-- Name: cotizacion_idcotizacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cotizacion_idcotizacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cotizacion_idcotizacion_seq OWNER TO postgres;

--
-- TOC entry 5284 (class 0 OID 0)
-- Dependencies: 241
-- Name: cotizacion_idcotizacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cotizacion_idcotizacion_seq OWNED BY public.cotizacion.idcotizacion;


--
-- TOC entry 250 (class 1259 OID 16904)
-- Name: detallecompra; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.detallecompra (
    iddetalle integer NOT NULL,
    numero_orden integer,
    idproductos integer,
    cantidad integer,
    precio_unitario numeric,
    total numeric
);


ALTER TABLE public.detallecompra OWNER TO user1_abd;

--
-- TOC entry 249 (class 1259 OID 16903)
-- Name: detallecompra_iddetalle_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.detallecompra_iddetalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallecompra_iddetalle_seq OWNER TO user1_abd;

--
-- TOC entry 5285 (class 0 OID 0)
-- Dependencies: 249
-- Name: detallecompra_iddetalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.detallecompra_iddetalle_seq OWNED BY public.detallecompra.iddetalle;


--
-- TOC entry 254 (class 1259 OID 17007)
-- Name: detallemantenimientoproductos; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.detallemantenimientoproductos (
    iddetalle integer NOT NULL,
    idmantenimiento integer,
    idproductos integer,
    cantidad integer,
    precio numeric
);


ALTER TABLE public.detallemantenimientoproductos OWNER TO user1_abd;

--
-- TOC entry 253 (class 1259 OID 17006)
-- Name: detallemantenimientoproductos_iddetalle_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.detallemantenimientoproductos_iddetalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallemantenimientoproductos_iddetalle_seq OWNER TO user1_abd;

--
-- TOC entry 5286 (class 0 OID 0)
-- Dependencies: 253
-- Name: detallemantenimientoproductos_iddetalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.detallemantenimientoproductos_iddetalle_seq OWNED BY public.detallemantenimientoproductos.iddetalle;


--
-- TOC entry 252 (class 1259 OID 16987)
-- Name: detallemantenimientoservicios; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.detallemantenimientoservicios (
    iddetalle integer NOT NULL,
    idmantenimiento integer,
    idservicios integer,
    precio numeric,
    descripcion character varying(255)
);


ALTER TABLE public.detallemantenimientoservicios OWNER TO user1_abd;

--
-- TOC entry 251 (class 1259 OID 16986)
-- Name: detallemantenimientoservicios_iddetalle_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.detallemantenimientoservicios_iddetalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallemantenimientoservicios_iddetalle_seq OWNER TO user1_abd;

--
-- TOC entry 5287 (class 0 OID 0)
-- Dependencies: 251
-- Name: detallemantenimientoservicios_iddetalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.detallemantenimientoservicios_iddetalle_seq OWNED BY public.detallemantenimientoservicios.iddetalle;


--
-- TOC entry 260 (class 1259 OID 17526)
-- Name: detalleventa; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.detalleventa (
    iddetalleventa integer NOT NULL,
    idventa integer,
    idproductos integer,
    cantidad integer DEFAULT 1 NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL
);


ALTER TABLE public.detalleventa OWNER TO user1_abd;

--
-- TOC entry 259 (class 1259 OID 17525)
-- Name: detalleventa_iddetalleventa_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.detalleventa_iddetalleventa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalleventa_iddetalleventa_seq OWNER TO user1_abd;

--
-- TOC entry 5288 (class 0 OID 0)
-- Dependencies: 259
-- Name: detalleventa_iddetalleventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.detalleventa_iddetalleventa_seq OWNED BY public.detalleventa.iddetalleventa;


--
-- TOC entry 246 (class 1259 OID 16766)
-- Name: factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factura (
    idfactura integer NOT NULL,
    idventa integer,
    img text
);


ALTER TABLE public.factura OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16765)
-- Name: factura_idfactura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.factura_idfactura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.factura_idfactura_seq OWNER TO postgres;

--
-- TOC entry 5289 (class 0 OID 0)
-- Dependencies: 245
-- Name: factura_idfactura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.factura_idfactura_seq OWNED BY public.factura.idfactura;


--
-- TOC entry 256 (class 1259 OID 17031)
-- Name: mantenimiento; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.mantenimiento (
    idmantenimiento integer NOT NULL,
    idvehiculos integer,
    tecnico character varying(100),
    kilometraje character varying(50),
    estado character varying(50),
    fecha date,
    observaciones text,
    costo_final numeric
);


ALTER TABLE public.mantenimiento OWNER TO user1_abd;

--
-- TOC entry 255 (class 1259 OID 17030)
-- Name: mantenimiento_idmantenimiento_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.mantenimiento_idmantenimiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mantenimiento_idmantenimiento_seq OWNER TO user1_abd;

--
-- TOC entry 5290 (class 0 OID 0)
-- Dependencies: 255
-- Name: mantenimiento_idmantenimiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.mantenimiento_idmantenimiento_seq OWNED BY public.mantenimiento.idmantenimiento;


--
-- TOC entry 222 (class 1259 OID 16568)
-- Name: marca; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marca (
    idmarcas integer NOT NULL,
    nombre character varying(45)
);


ALTER TABLE public.marca OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16567)
-- Name: marca_idmarcas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marca_idmarcas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.marca_idmarcas_seq OWNER TO postgres;

--
-- TOC entry 5291 (class 0 OID 0)
-- Dependencies: 221
-- Name: marca_idmarcas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marca_idmarcas_seq OWNED BY public.marca.idmarcas;


--
-- TOC entry 224 (class 1259 OID 16576)
-- Name: modelos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modelos (
    idmodelos integer NOT NULL,
    idmarcas integer,
    nombre character varying(45)
);


ALTER TABLE public.modelos OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 18307)
-- Name: modelos_has_anio; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.modelos_has_anio (
    idmodelos integer NOT NULL,
    idanio integer NOT NULL
);


ALTER TABLE public.modelos_has_anio OWNER TO user1_abd;

--
-- TOC entry 227 (class 1259 OID 16596)
-- Name: modelos_has_motores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modelos_has_motores (
    idmodelos integer NOT NULL,
    idmotores integer NOT NULL
);


ALTER TABLE public.modelos_has_motores OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16575)
-- Name: modelos_idmodelos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modelos_idmodelos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modelos_idmodelos_seq OWNER TO postgres;

--
-- TOC entry 5292 (class 0 OID 0)
-- Dependencies: 223
-- Name: modelos_idmodelos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modelos_idmodelos_seq OWNED BY public.modelos.idmodelos;


--
-- TOC entry 226 (class 1259 OID 16589)
-- Name: motores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.motores (
    idmotores integer NOT NULL,
    tipo_motor character varying(45)
);


ALTER TABLE public.motores OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16588)
-- Name: motores_idmotores_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.motores_idmotores_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.motores_idmotores_seq OWNER TO postgres;

--
-- TOC entry 5293 (class 0 OID 0)
-- Dependencies: 225
-- Name: motores_idmotores_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.motores_idmotores_seq OWNED BY public.motores.idmotores;


--
-- TOC entry 233 (class 1259 OID 16657)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    idproductos integer NOT NULL,
    nombre character varying(100),
    precio_unitario integer,
    precio_venta integer,
    stock_minimo integer,
    categoria character varying(100),
    sku character varying(50),
    ubicacion_almacen character varying(100),
    stock_actual integer DEFAULT 0,
    marca character varying(100)
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 17302)
-- Name: productos_compatibilidad; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.productos_compatibilidad (
    id integer NOT NULL,
    idproductos integer NOT NULL,
    idmarcas integer,
    idmodelos integer,
    cantidad integer DEFAULT 1 NOT NULL,
    precio_especial numeric(10,2) DEFAULT NULL::numeric
);


ALTER TABLE public.productos_compatibilidad OWNER TO user1_abd;

--
-- TOC entry 257 (class 1259 OID 17301)
-- Name: productos_compatibilidad_id_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.productos_compatibilidad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_compatibilidad_id_seq OWNER TO user1_abd;

--
-- TOC entry 5294 (class 0 OID 0)
-- Dependencies: 257
-- Name: productos_compatibilidad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.productos_compatibilidad_id_seq OWNED BY public.productos_compatibilidad.id;


--
-- TOC entry 236 (class 1259 OID 16674)
-- Name: productos_has_servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos_has_servicios (
    idproductos integer NOT NULL,
    idservicios integer NOT NULL,
    cantidad integer DEFAULT 1
);


ALTER TABLE public.productos_has_servicios OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16656)
-- Name: productos_idproductos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_idproductos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_idproductos_seq OWNER TO postgres;

--
-- TOC entry 5295 (class 0 OID 0)
-- Dependencies: 232
-- Name: productos_idproductos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_idproductos_seq OWNED BY public.productos.idproductos;


--
-- TOC entry 238 (class 1259 OID 16692)
-- Name: proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedor (
    idproveedor integer NOT NULL,
    nombre character varying(100)
);


ALTER TABLE public.proveedor OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16691)
-- Name: proveedor_idproveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedor_idproveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedor_idproveedor_seq OWNER TO postgres;

--
-- TOC entry 5296 (class 0 OID 0)
-- Dependencies: 237
-- Name: proveedor_idproveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedor_idproveedor_seq OWNED BY public.proveedor.idproveedor;


--
-- TOC entry 263 (class 1259 OID 26413)
-- Name: roles; Type: TABLE; Schema: public; Owner: user1_abd
--

CREATE TABLE public.roles (
    idroles integer NOT NULL,
    nombre character varying(100),
    descripcion character varying(255),
    permisos text
);


ALTER TABLE public.roles OWNER TO user1_abd;

--
-- TOC entry 262 (class 1259 OID 26412)
-- Name: roles_idroles_seq; Type: SEQUENCE; Schema: public; Owner: user1_abd
--

CREATE SEQUENCE public.roles_idroles_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_idroles_seq OWNER TO user1_abd;

--
-- TOC entry 5297 (class 0 OID 0)
-- Dependencies: 262
-- Name: roles_idroles_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user1_abd
--

ALTER SEQUENCE public.roles_idroles_seq OWNED BY public.roles.idroles;


--
-- TOC entry 235 (class 1259 OID 16665)
-- Name: servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicios (
    idservicios integer NOT NULL,
    nombre character varying(100),
    descripcion character varying(255),
    tiempo_estimado numeric,
    costo numeric,
    categoria character varying(40),
    mano_obra numeric,
    refacciones_estimadas numeric
);


ALTER TABLE public.servicios OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16664)
-- Name: servicios_idservicios_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicios_idservicios_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_idservicios_seq OWNER TO postgres;

--
-- TOC entry 5298 (class 0 OID 0)
-- Dependencies: 234
-- Name: servicios_idservicios_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicios_idservicios_seq OWNED BY public.servicios.idservicios;


--
-- TOC entry 220 (class 1259 OID 16555)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    idusuarios integer NOT NULL,
    idroles integer,
    email character varying(100),
    contrasena character varying(100),
    nombre character varying(100),
    telefono character varying(20)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16554)
-- Name: usuarios_idusuarios_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_idusuarios_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_idusuarios_seq OWNER TO postgres;

--
-- TOC entry 5299 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_idusuarios_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_idusuarios_seq OWNED BY public.usuarios.idusuarios;


--
-- TOC entry 231 (class 1259 OID 16622)
-- Name: vehiculos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehiculos (
    idvehiculos integer NOT NULL,
    idusuarios integer,
    idanio integer,
    idmarcas integer,
    idmotores integer,
    idmodelos integer,
    placa character varying(20),
    color character varying(45),
    km numeric,
    vin character varying(50)
);


ALTER TABLE public.vehiculos OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16621)
-- Name: vehiculos_idvehiculos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehiculos_idvehiculos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehiculos_idvehiculos_seq OWNER TO postgres;

--
-- TOC entry 5300 (class 0 OID 0)
-- Dependencies: 230
-- Name: vehiculos_idvehiculos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehiculos_idvehiculos_seq OWNED BY public.vehiculos.idvehiculos;


--
-- TOC entry 244 (class 1259 OID 16748)
-- Name: venta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venta (
    idventa integer NOT NULL,
    idproductos integer,
    idusuarios integer,
    metodo_pago integer,
    total integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.venta OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16747)
-- Name: venta_idventa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venta_idventa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.venta_idventa_seq OWNER TO postgres;

--
-- TOC entry 5301 (class 0 OID 0)
-- Dependencies: 243
-- Name: venta_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venta_idventa_seq OWNED BY public.venta.idventa;


--
-- TOC entry 4972 (class 2604 OID 16617)
-- Name: anio idanio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anio ALTER COLUMN idanio SET DEFAULT nextval('public.anio_idanio_seq'::regclass);


--
-- TOC entry 4986 (class 2604 OID 16809)
-- Name: cita idcita; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita ALTER COLUMN idcita SET DEFAULT nextval('public.cita_idcita_seq'::regclass);


--
-- TOC entry 4979 (class 2604 OID 16703)
-- Name: compra numero_orden; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra ALTER COLUMN numero_orden SET DEFAULT nextval('public.compra_numero_orden_seq'::regclass);


--
-- TOC entry 4981 (class 2604 OID 16721)
-- Name: cotizacion idcotizacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizacion ALTER COLUMN idcotizacion SET DEFAULT nextval('public.cotizacion_idcotizacion_seq'::regclass);


--
-- TOC entry 4988 (class 2604 OID 16907)
-- Name: detallecompra iddetalle; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallecompra ALTER COLUMN iddetalle SET DEFAULT nextval('public.detallecompra_iddetalle_seq'::regclass);


--
-- TOC entry 4990 (class 2604 OID 17010)
-- Name: detallemantenimientoproductos iddetalle; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallemantenimientoproductos ALTER COLUMN iddetalle SET DEFAULT nextval('public.detallemantenimientoproductos_iddetalle_seq'::regclass);


--
-- TOC entry 4989 (class 2604 OID 16990)
-- Name: detallemantenimientoservicios iddetalle; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallemantenimientoservicios ALTER COLUMN iddetalle SET DEFAULT nextval('public.detallemantenimientoservicios_iddetalle_seq'::regclass);


--
-- TOC entry 4995 (class 2604 OID 17529)
-- Name: detalleventa iddetalleventa; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detalleventa ALTER COLUMN iddetalleventa SET DEFAULT nextval('public.detalleventa_iddetalleventa_seq'::regclass);


--
-- TOC entry 4985 (class 2604 OID 16769)
-- Name: factura idfactura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura ALTER COLUMN idfactura SET DEFAULT nextval('public.factura_idfactura_seq'::regclass);


--
-- TOC entry 4991 (class 2604 OID 17034)
-- Name: mantenimiento idmantenimiento; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.mantenimiento ALTER COLUMN idmantenimiento SET DEFAULT nextval('public.mantenimiento_idmantenimiento_seq'::regclass);


--
-- TOC entry 4969 (class 2604 OID 16571)
-- Name: marca idmarcas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca ALTER COLUMN idmarcas SET DEFAULT nextval('public.marca_idmarcas_seq'::regclass);


--
-- TOC entry 4970 (class 2604 OID 16579)
-- Name: modelos idmodelos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos ALTER COLUMN idmodelos SET DEFAULT nextval('public.modelos_idmodelos_seq'::regclass);


--
-- TOC entry 4971 (class 2604 OID 16592)
-- Name: motores idmotores; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motores ALTER COLUMN idmotores SET DEFAULT nextval('public.motores_idmotores_seq'::regclass);


--
-- TOC entry 4974 (class 2604 OID 16660)
-- Name: productos idproductos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN idproductos SET DEFAULT nextval('public.productos_idproductos_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 17305)
-- Name: productos_compatibilidad id; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.productos_compatibilidad ALTER COLUMN id SET DEFAULT nextval('public.productos_compatibilidad_id_seq'::regclass);


--
-- TOC entry 4978 (class 2604 OID 16695)
-- Name: proveedor idproveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor ALTER COLUMN idproveedor SET DEFAULT nextval('public.proveedor_idproveedor_seq'::regclass);


--
-- TOC entry 4997 (class 2604 OID 26416)
-- Name: roles idroles; Type: DEFAULT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.roles ALTER COLUMN idroles SET DEFAULT nextval('public.roles_idroles_seq'::regclass);


--
-- TOC entry 4976 (class 2604 OID 16668)
-- Name: servicios idservicios; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios ALTER COLUMN idservicios SET DEFAULT nextval('public.servicios_idservicios_seq'::regclass);


--
-- TOC entry 4968 (class 2604 OID 16558)
-- Name: usuarios idusuarios; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN idusuarios SET DEFAULT nextval('public.usuarios_idusuarios_seq'::regclass);


--
-- TOC entry 4973 (class 2604 OID 16625)
-- Name: vehiculos idvehiculos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos ALTER COLUMN idvehiculos SET DEFAULT nextval('public.vehiculos_idvehiculos_seq'::regclass);


--
-- TOC entry 4983 (class 2604 OID 16751)
-- Name: venta idventa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta ALTER COLUMN idventa SET DEFAULT nextval('public.venta_idventa_seq'::regclass);


--
-- TOC entry 5241 (class 0 OID 16614)
-- Dependencies: 229
-- Data for Name: anio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anio (idanio, anio) FROM stdin;
1	2025
2	2024
3	2000
4	2001
5	1990
6	1991
7	1992
8	1993
9	1994
10	1995
11	1996
12	1997
13	1998
14	1999
15	2002
16	2003
17	2004
18	2005
19	2006
20	2007
21	2008
22	2009
23	2010
24	2011
25	2012
26	2013
27	2014
28	2015
29	2016
30	2017
31	2018
32	2019
33	2020
34	2021
35	2022
36	2023
37	2026
\.


--
-- TOC entry 5260 (class 0 OID 16806)
-- Dependencies: 248
-- Data for Name: cita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cita (idcita, idcotizacion, idusuarios, fecha, hora, nota, estado) FROM stdin;
\.


--
-- TOC entry 5252 (class 0 OID 16700)
-- Dependencies: 240
-- Data for Name: compra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compra (numero_orden, idproveedor, estado_compra, total, estado_pago, fecha) FROM stdin;
1	1	Recibido	2000	Pagado	2026-05-04 14:05:27.324093
2	2	Recibido	5990	Pendiente	2026-05-04 14:08:48.356736
3	3	Recibido	720	Pendiente	2026-05-04 23:02:54.800485
4	1	Recibido	3000	Pendiente	2026-05-05 07:33:21.893218
5	2	Recibido	800	Pendiente	2026-05-05 14:27:01.587573
\.


--
-- TOC entry 5254 (class 0 OID 16718)
-- Dependencies: 242
-- Data for Name: cotizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cotizacion (idcotizacion, idusuarios, idvehiculos, idservicios, idproductos, total_estimado, fecha, detalles, estado) FROM stdin;
\.


--
-- TOC entry 5262 (class 0 OID 16904)
-- Dependencies: 250
-- Data for Name: detallecompra; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.detallecompra (iddetalle, numero_orden, idproductos, cantidad, precio_unitario, total) FROM stdin;
1	1	1	10	200	2000
2	2	1	14	235	3290
3	2	2	15	180	2700
4	3	2	4	180	720
5	4	3	20	150	3000
6	5	2	2	100	200
7	5	3	2	300	600
\.


--
-- TOC entry 5266 (class 0 OID 17007)
-- Dependencies: 254
-- Data for Name: detallemantenimientoproductos; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.detallemantenimientoproductos (iddetalle, idmantenimiento, idproductos, cantidad, precio) FROM stdin;
\.


--
-- TOC entry 5264 (class 0 OID 16987)
-- Dependencies: 252
-- Data for Name: detallemantenimientoservicios; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.detallemantenimientoservicios (iddetalle, idmantenimiento, idservicios, precio, descripcion) FROM stdin;
\.


--
-- TOC entry 5272 (class 0 OID 17526)
-- Dependencies: 260
-- Data for Name: detalleventa; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.detalleventa (iddetalleventa, idventa, idproductos, cantidad, precio_unitario, subtotal) FROM stdin;
1	3	1	1	235.00	235.00
2	4	1	4	235.00	940.00
3	5	2	1	250.00	250.00
4	6	1	2	235.00	470.00
5	6	3	1	300.00	300.00
\.


--
-- TOC entry 5258 (class 0 OID 16766)
-- Dependencies: 246
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.factura (idfactura, idventa, img) FROM stdin;
\.


--
-- TOC entry 5268 (class 0 OID 17031)
-- Dependencies: 256
-- Data for Name: mantenimiento; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.mantenimiento (idmantenimiento, idvehiculos, tecnico, kilometraje, estado, fecha, observaciones, costo_final) FROM stdin;
\.


--
-- TOC entry 5234 (class 0 OID 16568)
-- Dependencies: 222
-- Data for Name: marca; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marca (idmarcas, nombre) FROM stdin;
43	ASTON MARTIN
44	TESLA
45	JAGUAR
46	MASERATI
47	ROLLS-ROYCE
48	TOYOTA
49	MERCEDES-BENZ
50	BMW
51	BUGATTI
52	MINI
53	FORD
54	LINCOLN
55	MERCURY
56	LOTUS
57	CHEVROLET
58	BUICK
59	CADILLAC
60	HOLDEN
61	OPEL
62	GMC
63	MAZDA
64	HONDA
65	ACURA
66	DODGE
67	CHRYSLER
68	NISSAN
69	INFINITI
70	MITSUBISHI
71	VOLKSWAGEN
72	VOLVO
73	FIAT
74	ALFA ROMEO
75	LANCIA
76	HYUNDAI
77	KIA
78	LAMBORGHINI
79	SMART
80	SUZUKI
81	LEXUS
82	SUBARU
83	MAYBACH
84	PONTIAC
85	ISUZU
86	TRIUMPH
87	SAAB
88	AUDI
89	BENTLEY
90	PORSCHE
91	FERRARI
92	AM GENERAL
93	CREATIVE COACHWORKS
94	AC PROPULSION
95	DAIHATSU
96	FALCON
97	EV INNOVATIONS
98	FAW JIAXING HAPPY MESSENGER
99	SATURN
100	DAEWOO
101	AMERICAN MOTORS
102	FORMULA 1 STREET COM
103	GEO
104	FORTUNESPORT VES
105	AAS
106	EQUUS AUTOMOTIVE
107	ELECTRIC MOBILE CARS
108	AVERA MOTORS
109	BAKKURA MOBILITY
110	TH!NK
111	CODA
112	CONTEMPORARY CLASSIC CARS (CCC)
113	KOENIGSEGG
114	BYD
115	KANDI
116	KEPLER MOTORS
117	MAKING YOU MOBILE
118	MCLAREN
119	MYCAR
120	EAGLE
121	PLYMOUTH
122	NJD AUTOMOTIVE LLC
123	PHOENIX MOTORCARS
124	ROCKET SLED MOTORS
125	VISION INDUSTRIES
126	WARHAWK PERFORMANCE
127	UKEYCHEYMA
128	TOTAL ELECTRIC VEHICLES
129	SPYKER
130	OLDSMOBILE
131	PANOZ
132	SALEEN
133	SOLECTRIA
134	YESTER YEAR AUTO
135	BXR
136	ENGINE CONNECTION
137	BLUECAR
138	MOSLER
139	PAGANI
140	REVOLOGY
141	EMA
142	COSTIN SPORTS CAR
143	GENESIS
144	KARMA
145	MATRIX MOTOR COMPANY
146	ARMBRUSTER STAGEWAY
147	LUMEN
148	ASUNA
149	MERKUR
150	AVANTI
151	YUGO
152	PEUGEOT
153	STERLING MOTOR CAR
154	CONSULIER GTP
155	DATSUN
156	PININFARINA
157	VINTAGE AUTO
158	LONDONCOACH INC
159	MGS GRAND SPORT (MARDIKIAN)
160	PANTHER
161	DAYTONA COACH BUILDERS
162	UCC
163	RS SPIDER
164	GRUPPE B
165	RALLY SPORT
166	RENAISSANCE
167	JAC 427
168	HUNTER DESIGN GROUP, LLC
169	BLACKWATER
170	GULLWING INTERNATIONAL MOTORS, LTD.
171	AMERITECH CORPORATION
172	STANFORD CUSTOMS
173	CLASSIC ROADSTERS
174	HERITAGE
175	COBRA CARS
176	C-R CHEETAH RACE CARS
177	PAS
178	BUG MOTORS
179	EXCALIBUR AUTOMOBILE CORPORATION
180	IVES MOTORS CORPORATION (IMC)
181	AUTODELTA USA INC
182	AUTOCAR LTD
183	MOKE
184	BBC
185	PHOENIX SPORTS CARS, INC.
186	VECTOR AEROMOTIVE CORPORATION
187	CARBODIES
188	CREATIVE COACHWORKS INC.
189	WESTFALL MOTORS CORP.
190	CLENET
191	ELECTRIC CAR COMPANY
192	CX AUTOMOTIVE
193	LA EXOTICS
194	CLASSIC SPORTS CARS
195	SF MOTORS INC.
196	SCUDERIA CAMERON GLICKENHAUS (SCG)
197	VINTAGE CRUISER
198	VINTAGE MICROBUS
199	VINTAGE ROVER
200	LITE CAR
201	POLESTAR
202	CZINGER
203	GLICKENHAUS
204	DONGFENG
205	CRUISE
206	LUCID
207	CALMOTORS
208	AUTOMOBILI PININFARINA
209	ALLARD MOTOR WORKS
210	SHELBY
211	FISKER
212	RIMAC
213	ZOOX
214	ECOCAR
215	SUPERCAR SYSTEM
216	RUF
217	KINDIG
218	SSC NORTH AMERICA
219	BALLISTIC
220	MEYERS MANX
221	1955 CUSTOM BELAIR
222	ELKINGTON
223	MK SPORTSCARS
224	SHAY REPRODUCTION
225	DELOREAN
226	CLENET COACHWORKS
227	CHECKER
228	BERTONE
229	CAMELOT
230	ZEEKR
231	BACKDRAFT
232	FALCON MOTORS
233	MAYHEM AUTOWORKZ
234	RENAULT
235	HEDLEY STUDIOS
\.


--
-- TOC entry 5236 (class 0 OID 16576)
-- Dependencies: 224
-- Data for Name: modelos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modelos (idmodelos, idmarcas, nombre) FROM stdin;
2151	43	V8 VANTAGE
2152	43	DBS
2153	43	DB9
2154	43	RAPIDE
2155	43	V12 VANTAGE
2156	43	VIRAGE
2157	43	VANQUISH
2158	43	DB11
2159	43	LAGONDA
2160	43	VANTAGE
2161	43	V8
2162	43	VANQUISH ZAGATO
2163	43	DBX
2164	43	DB12
2165	43	VALOUR
2166	43	DB7
2167	43	VALIANT
2168	43	VALHALLA
2169	44	MODEL S
2170	44	ROADSTER
2171	44	MODEL X
2172	44	MODEL 3
2173	44	MODEL Y
2174	44	SEMI
2175	44	CYBERTRUCK
2176	45	XJ
2177	45	XF
2178	45	XK
2179	45	X-TYPE
2180	45	S-TYPE
2181	45	F-TYPE
2182	45	VANDEN PLAS
2183	45	XK8
2184	45	XJR
2185	45	XE
2186	45	F-PACE
2187	45	XJ8
2188	45	XJ6
2189	45	XJS
2190	45	E-PACE
2191	45	I-PACE
2192	45	XJ12
2193	46	QUATTROPORTE
2194	46	GRANTURISMO
2195	46	COUPE
2196	46	SPYDER
2197	46	GHIBLI
2198	46	LEVANTE
2199	46	MERAK
2200	46	BITURBO
2201	46	TC
2202	46	430
2203	46	228
2204	46	MC20
2205	46	GRECALE
2206	46	GRANCABRIO
2207	47	PHANTOM
2208	47	GHOST
2209	47	WRAITH
2210	47	SILVER DAWN
2211	47	SILVER SPUR
2212	47	SILVER SPIRIT
2213	47	TOURING LIMOUSINE
2214	47	CORNICHE
2215	47	PARK WARD
2216	47	SILVER SERAPH
2217	47	DAWN
2218	47	CAMARGUE
2219	47	CULLINAN
2220	47	FLYING SPUR
2221	47	SPECTRE
2222	48	SCION XA
2223	48	SCION TC
2224	48	COROLLA
2225	48	PRIUS
2226	48	SCION XB
2227	48	LAND CRUISER
2228	48	HIGHLANDER
2229	48	4RUNNER
2230	48	RAV4
2231	48	TACOMA
2232	48	SCION FR-S
2233	48	FJ CRUISER
2234	48	YARIS
2235	48	AVALON
2236	48	COROLLA MATRIX
2237	48	TUNDRA
2238	48	SIENNA
2239	48	CAMRY
2240	48	CAMRY SOLARA
2241	48	SEQUOIA
2242	48	SCION XD
2243	48	VENZA
2244	48	FCHV-ADV
2245	48	TERCEL
2246	48	CELICA
2247	48	SUPRA
2248	48	MR2
2249	48	PASEO
2250	48	ECHO
2251	48	CRESSIDA
2252	48	CARGO VAN
2253	48	PREVIA
2254	48	T100
2255	48	MIRAI
2256	48	SCION IQ
2257	48	SCION IM
2258	48	86
2259	48	SCION IA
2260	48	PRIUS V
2261	48	PRIUS C
2262	48	PICK-UP
2263	48	VAN
2264	48	STARLET
2265	48	CORONA
2266	48	COROLLA IM
2267	48	C-HR
2268	48	PRIUS PRIME (PHEV)
2269	48	YARIS IA
2270	48	RAV4 PRIME (PHEV)
2271	48	COROLLA CROSS
2272	48	GR86
2273	48	BZ4X
2274	48	CROWN
2275	48	GR COROLLA
2276	48	GRAND HIGHLANDER
2277	48	CROWN SIGNIA
2278	48	BZ
2279	48	BZ WOODLAND
2280	49	SPRINTER
2281	49	SL-CLASS
2282	49	SLK-CLASS
2283	49	E-CLASS
2284	49	CLS-CLASS
2285	49	CLA-CLASS
2286	49	GLA-CLASS
2287	49	C-CLASS
2288	49	S-CLASS
2289	49	SLS-CLASS
2290	49	B-CLASS
2291	49	M-CLASS
2292	49	GL-CLASS
2293	49	G-CLASS
2294	49	GLK-CLASS
2295	49	CL-CLASS
2296	49	CLK-CLASS
2297	49	SLR MCLAREN
2298	49	R-CLASS
2299	49	AMG GT
2300	49	GLC-CLASS
2301	49	GLE-CLASS
2302	49	METRIS
2303	49	SLC-CLASS
2304	49	ML-CLASS
2305	49	GLS-CLASS
2306	49	190
2307	49	300
2308	49	500
2309	49	L1013
2310	49	L1113
2311	49	L1116
2312	49	L1316
2313	49	L1418
2314	49	L1117
2315	49	L1317
2316	49	L1419
2317	49	LP1419
2318	49	LPS1525
2319	49	LP1219
2320	49	L1319
2321	49	280
2322	49	240
2323	49	380
2324	49	400
2325	49	600
2326	49	350
2327	49	420
2328	49	560
2329	49	260
2330	49	A-CLASS
2331	49	GLB-CLASS
2332	49	EQC-CLASS
2333	49	EQS-CLASS SEDAN
2334	49	EQE-CLASS SEDAN
2335	49	EQB-CLASS
2336	49	EQS-CLASS SUV
2337	49	EQE-CLASS SUV
2338	49	ESPRINTER
2339	49	CLE
2340	50	128I
2341	50	135I
2342	50	328I
2343	50	M3
2344	50	335I
2345	50	335IS
2346	50	335D
2347	50	X6
2348	50	528I
2349	50	535I
2350	50	X5
2351	50	550I
2352	50	X3
2353	50	740I
2354	50	740LI
2355	50	750I
2356	50	750LI
2357	50	760LI
2358	50	Z4
2359	50	750XI
2360	50	750LXI
2361	50	M6
2362	50	528XI
2363	50	640I
2364	50	650I
2365	50	650XI
2366	50	G 450 X
2367	50	F 800 S
2368	50	F 800 ST
2369	50	F 800 GS
2370	50	F 800 R
2371	50	HP2
2372	50	S 1000 RR
2373	50	R 1200 GS
2374	50	R 1200 R
2375	50	R 1200 RT
2376	50	K 1300 S
2377	50	K 1300 GT
2378	50	K 1300 R
2379	50	F 650 GS
2380	50	G 650 GS
2381	50	R 900 RT
2382	50	K 1600 GT
2383	50	K 1600 GTL
2384	50	F 700 GS
2385	50	F 800 GT
2386	50	C 600
2387	50	C 650 GT
2388	50	HP4
2389	50	S 1000 R
2390	50	R NINET
2391	50	1M
2392	50	ACTIVEE
2393	50	M5
2394	50	228I
2395	50	M235I
2396	50	320I
2397	50	328D
2398	50	I3
2399	50	I8
2400	50	ACTIVEHYBRID 3
2401	50	428I
2402	50	435I
2403	50	535D
2404	50	ACTIVEHYBRID 5
2405	50	X1
2406	50	R 1150 GS
2407	50	R 1200 S
2408	50	R 1200 ST
2409	50	K 1200 R
2410	50	K 1200 S
2411	50	K 1200 LT
2412	50	K 1200 GT
2413	50	R 1150 R
2414	50	R 850 R
2415	50	535XI
2416	50	328XI
2417	50	335XI
2418	50	525I
2419	50	530I
2420	50	530XI
2421	50	525XI
2422	50	325CI
2423	50	330CI
2424	50	325I
2425	50	325XI
2426	50	330I
2427	50	330XI
2428	50	760I
2429	50	545I
2430	50	645CI
2431	50	745I
2432	50	745LI
2433	50	K 1100 RS
2434	50	K75
2435	50	K75S
2436	50	K75RT
2437	50	K 1100 LT
2438	50	R 100
2439	50	R 100 R
2440	50	R 100 RT
2441	50	R 100 GS
2442	50	R 1100 R
2443	50	R 1100 RS
2444	50	R 1100 GS
2445	50	F 650
2446	50	F 650 S
2447	50	R 1100 RT
2448	50	K 1200 RS
2449	50	R 1200 C
2450	50	F 650 CS
2451	50	R 1100 S
2452	50	R 1150 RS
2453	50	R 1150 RT
2454	50	R 1200 CL
2455	50	318I
2456	50	318IS
2457	50	318IC
2458	50	325IS
2459	50	325IC
2460	50	540I
2461	50	840CI
2462	50	850CI
2463	50	850CSI
2464	50	318TI
2465	50	328IC
2466	50	328IS
2467	50	Z3
2468	50	323I
2469	50	323IS
2470	50	323IC
2471	50	Z8
2472	50	525IA
2473	50	530IA
2474	50	540IA
2475	50	ALPINA
2476	50	645I
2477	50	X4
2478	50	335
2479	50	740IL
2480	50	750IL
2481	50	M3CI
2482	50	M2
2483	50	340I
2484	50	330E
2485	50	M4
2486	50	S 1000 XR
2487	50	R 1200 RS
2488	50	C 650
2489	50	328CI
2490	50	R 100 GSPD
2491	50	735I
2492	50	735IL
2493	50	850I
2494	50	325IX
2495	50	325/325E
2496	50	635CSI
2497	50	535I/535IS
2498	50	L7
2499	50	524TD
2500	50	528E
2501	50	325I/325IS
2502	50	230I
2503	50	M240I
2504	50	430I
2505	50	440I
2506	50	B7
2507	50	740E
2508	50	750I, ALPINA B7
2509	50	533I
2510	50	633 CSI
2511	50	733I
2512	50	R 100 RS
2513	50	K 100 LT
2514	50	K 100 RS
2515	50	K1
2516	50	K100
2517	50	K 100 RT
2518	50	R 65
2519	50	R 80
2520	50	R 80 RT
2521	50	R 80 GS
2522	50	R 65 LS
2523	50	R 80 ST
2524	50	R 100 CS
2525	50	730I
2526	50	540D
2527	50	530E
2528	50	M550I
2529	50	M760I
2530	50	650I, ALPINA B6
2531	50	750LI, ALPINA B7
2532	50	750LXI, ALPINA B7
2533	50	750XI, ALPINA B7
2534	50	750I, B7
2535	50	650I, B6
2536	50	X2
2537	50	640XI
2538	50	X7
2539	50	M340I
2540	50	745E
2541	50	840I
2542	50	M850I
2543	50	M8
2544	50	G 310 R
2545	50	G 310 GS
2546	50	C 400 GT
2547	50	C 400 X
2548	50	F 750 GS
2549	50	F 850 GS
2550	50	R 1250 GS
2551	50	R 1250 RT
2552	50	R 1250 R
2553	50	R 1250 RS
2554	50	K 1600 B
2555	50	C EVOLUTION
2556	50	G 650
2557	50	F 900
2558	50	R 18 CLASSIC
2559	50	R 18
2560	50	M440I
2561	50	M760LI
2562	50	745LE
2563	50	CE 04
2564	50	M 1000
2565	50	IX
2566	50	I4
2567	50	I7
2568	50	XM
2569	50	ACTIVEHYBRID 7
2570	50	ALPINA B8
2571	50	750E
2572	50	I5
2573	50	CE 02
2574	50	R 18 ROCTANE
2575	50	R 18 B
2576	50	R 18 TRANSCONTINENTAL
2577	50	F 900 GS
2578	50	F 900 GS ADVENTURE
2579	50	F 900 R
2580	50	F 900 XR
2581	50	M 1000 XR
2582	50	M 1000 R
2583	50	M 1000 RR
2584	50	R 1250 GS ADVENTURE
2585	50	R 1300 GS
2586	50	R 12
2587	50	R 12 NINET
2588	50	325/325ES
2589	50	550E
2590	50	F 900 GS-P
2591	50	R 1300 GS ADVENTURE
2592	50	228
2593	50	M235
2594	50	R 1300 RT
2595	50	R 1300 R
2596	50	R 1300 RS
2597	50	R 12 G/S
2598	51	VEYRON
2599	51	CHIRON
2600	51	EB110
2601	51	CHIRON PUR SPORT
2602	51	CHIRON SUPERSPORT
2603	51	MISTRAL
2604	52	COOPER
2605	52	CLUBMAN
2606	52	COOPER CONVERTIBLE
2607	52	HARDTOP
2608	52	COUNTRYMAN
2609	52	COOPER COUPE
2610	52	COOPER ROADSTER
2611	52	PACEMAN
2612	53	CROWN VICTORIA
2613	53	FOCUS
2614	53	FUSION
2615	53	MUSTANG
2616	53	TAURUS
2617	53	E-150
2618	53	EDGE
2619	53	ESCAPE
2620	53	EXPEDITION
2621	53	EXPLORER
2622	53	F-150
2623	53	FLEX
2624	53	RANGER
2625	53	EXPLORER SPORT TRAC
2626	53	F-250
2627	53	F-350
2628	53	F-450
2629	53	F-550
2630	53	F-650
2631	53	F-750
2632	53	TRANSIT CONNECT
2633	53	E-250
2634	53	E-350
2635	53	E-450
2636	53	EXPEDITION MAX
2637	53	THUNDERBIRD
2638	53	GT
2639	53	FIVE HUNDRED
2640	53	EXCURSION
2641	53	FREESTYLE
2642	53	FREESTAR
2643	53	MOTORHOME CHASSIS
2644	53	TAURUS X
2645	53	FIESTA
2646	53	COMMERCIAL CHASSIS
2647	53	C-MAX
2648	53	TRANSIT
2649	53	ESCORT
2650	53	ZX2
2651	53	WINDSTAR
2652	53	E-550
2653	53	B-750
2654	53	F-800
2655	53	EXPLORER SPORT
2656	53	ASPIRE
2657	53	PROBE
2658	53	CONTOUR
2659	53	BRONCO
2660	53	AEROSTAR
2661	53	F-150 HERITAGE
2662	53	L8501
2663	53	LT8501
2664	53	L9501
2665	53	LT9501
2666	53	L8511
2667	53	LT8511
2668	53	L9511
2669	53	LT9511
2670	53	L8513
2671	53	LT8513
2672	53	L9513
2673	53	LT9513
2674	53	L9522
2675	53	LT9522
2676	53	A8513
2677	53	AT8513
2678	53	A9513
2679	53	AT9513
2680	53	A9522
2681	53	AT9522
2682	53	B800
2683	53	F-SUPER DUTY
2684	53	F-700
2685	53	P700
2686	53	P800
2687	53	FT900
2688	53	L8000
2689	53	L9000
2690	53	LL9000
2691	53	LLA9000
2692	53	LLS9000
2693	53	LS8000
2694	53	LS9000
2695	53	LT8000
2696	53	LT9000
2697	53	LTS8000
2698	53	LTS9000
2699	53	LTL9000
2700	53	LTLA9000
2701	53	LTLS9000
2702	53	LA8000
2703	53	LA9000
2704	53	LTA9000
2705	53	LN7000
2706	53	LN8000
2707	53	LN9000
2708	53	LNT8000
2709	53	LNT9000
2710	53	CF8000
2711	53	CFT8000
2712	53	CF7000
2713	53	FESTIVA
2714	53	LOW CAB FORWARD
2715	53	TEMPO
2716	53	B600
2717	53	B700
2718	53	F-600
2719	53	RECREATIONAL VEHICLE
2720	53	F-590
2721	53	P600
2722	53	CL9000
2723	53	CLT9000
2724	53	BRONCO II
2725	53	FT800
2726	53	CT8000
2727	53	C800
2728	53	C8000
2729	53	LASER
2730	53	LTD
2731	53	FAIRMONT
2732	53	GRANADA
2733	53	'34
2734	53	CF6000
2735	53	B7000
2736	53	C7000
2737	53	F7000
2738	53	F8000
2739	53	FT8000
2740	53	COURIER
2741	53	B6000
2742	53	C600
2743	53	C700
2744	53	F6000
2745	53	LN600
2746	53	LN700
2747	53	L800
2748	53	LT800
2749	53	LN800
2750	53	LNT800
2751	53	E-100
2752	53	F-100
2753	53	CT800
2754	53	ECOSPORT
2755	53	EXPEDITION EL
2756	53	BRONCO SPORT
2757	53	MUSTANG MACH-E
2758	53	MAVERICK
2759	53	GT MKII
2760	53	MUSTANG GTD
2761	54	MKZ
2762	54	TOWN CAR
2763	54	MKS
2764	54	MKT
2765	54	MKX
2766	54	NAVIGATOR
2767	54	LS
2768	54	AVIATOR
2769	54	ZEPHYR
2770	54	MARK LT
2771	54	MKC
2772	54	CONTINENTAL
2773	54	BLACKWOOD
2774	54	MARK
2775	54	NAUTILUS
2776	54	CORSAIR
2777	54	NAVIGATOR L
2778	55	GRAND MARQUIS
2779	55	MILAN
2780	55	MARINER
2781	55	MOUNTAINEER
2782	55	SABLE
2783	55	MONTEGO
2784	55	MONTEREY
2785	55	COUGAR
2786	55	VILLAGER
2787	55	TRACER
2788	55	MYSTIQUE
2789	55	CAPRI
2790	55	TOPAZ
2791	55	LYNX
2792	55	MARQUIS
2793	55	ZEPHYR
2794	55	MARAUDER
2795	56	EVORA
2796	56	ELISE
2797	56	ELEVEN
2798	56	ESPRIT
2799	56	EAGLE
2800	56	EUROPA
2801	56	MONACO
2802	56	MEL
2803	56	ELITE
2804	56	ECLAT
2805	56	ELAN
2806	56	EXIGE
2807	56	SPA
2808	56	340R
2809	56	MONZA
2810	56	2-ELEVEN
2811	56	TURBO ESPRIT
2812	56	EMIRA
2813	56	ELETRE
2814	57	AVEO
2815	57	CAMARO
2816	57	CAPRICE POLICE VEHICLE
2817	57	CORVETTE
2818	57	CRUZE
2819	57	IMPALA
2820	57	MALIBU
2821	57	SONIC
2822	57	SPARK
2823	57	SS
2824	57	VOLT
2825	57	CAPTIVA SPORT
2826	57	EQUINOX
2827	57	EXPRESS
2828	57	ORLANDO
2829	57	SILVERADO
2830	57	SUBURBAN
2831	57	TAHOE
2832	57	TRAVERSE
2833	57	TRACKER
2834	57	CITY EXPRESS
2835	57	GEO PRIZM
2836	57	AVALANCHE
2837	57	MATIZ
2838	57	COLORADO
2839	57	COBALT
2840	57	OPTRA
2841	57	KALOS
2842	57	TRAILBLAZER
2843	57	HHR
2844	57	UPLANDER
2845	57	W4
2846	57	W5
2847	57	MONTE CARLO
2848	57	SSR
2849	57	EPICA
2850	57	CAVALIER
2851	57	U100
2852	57	3 TON
2853	57	ASTRO VAN
2854	57	VENTURE
2855	57	B7
2856	57	LUMINA
2857	57	ALERO
2858	57	CAPRICE
2859	57	CORSICA
2860	57	BERETTA
2861	57	HEARSE/LIMO
2862	57	METRO
2863	57	GMT-400
2864	57	MILITARY TRUCK
2865	57	FORWARD CONTROL
2866	57	TRAX
2867	57	S-10 PICKUP
2868	57	C/K PICKUP
2869	57	P - SERIES
2870	57	LUMINA APV
2871	57	BLAZER
2872	57	IMPALA LIMITED
2873	57	BOLT EV
2874	57	3500HD
2875	57	5500HD
2876	57	3500/4500
2877	57	4500HD
2878	57	4500XD
2879	57	5500XD
2880	57	T-SERIES
2881	57	C4
2882	57	C5
2883	57	C6
2884	57	C7
2885	57	C8
2886	57	W7
2887	57	HEARSE/LIMO COMMERCIAL CHASSIS
2888	57	W3
2889	57	W6
2890	57	D7
2891	57	P6S
2892	57	S-10 BLAZER
2893	57	P TRUCK FORWARD
2894	57	CELEBRITY
2895	57	GEO SPECTRUM
2896	57	G-SERIES
2897	57	CUTAWAY CHASSIS
2898	57	MOTORHOME CHASSIS
2899	57	CHEVETTE
2900	57	HI-CUBE
2901	57	CUTAWAY VAN
2902	57	S7
2903	57	GEO SPRINT
2904	57	NOVA
2905	57	S6
2906	57	R CONVENTIONAL
2907	57	V CONVENTIONAL
2908	57	CITATION
2909	57	BUS CHASSIS
2910	57	HEAVY CONVENTIONAL
2911	57	ALUMINUM TILT
2912	57	EL CAMINO
2913	57	LUV
2914	57	MALIBU CLASSIC
2915	57	3500
2916	57	4500
2917	57	BOLT INCOMPLETE
2918	57	FTR / 6500XD
2919	57	6500XD
2920	57	SILVERADO HD
2921	57	SILVERADO LD
2922	57	7500XD
2923	57	W3500/W4500
2924	57	W5500/W5500 HD
2925	57	ONIX
2926	57	SILVERADO LTD
2927	57	BOLT EUV
2928	57	3500HG
2929	57	4500HG
2930	57	5500HG
2931	57	5500XG
2932	57	TRAVERSE LIMITED
2933	57	CRUZE LIMITED
2934	57	MALIBU LIMITED
2935	57	BRIGHTDROP
2936	57	SUBURBAN HD
2937	57	BOLT
2938	58	LACROSSE
2939	58	REGAL
2940	58	VERANO
2941	58	ENCLAVE
2942	58	ENCORE
2943	58	LUCERNE
2944	58	ALLURE
2945	58	TERRAZA
2946	58	RAINIER
2947	58	RENDEZVOUS
2948	58	PARK AVENUE
2949	58	LESABRE
2950	58	CENTURY
2951	58	INCOMPLETE
2952	58	RIVIERA
2953	58	SKYLARK
2954	58	COACHBUILDER
2955	58	ROADMASTER
2956	58	CASCADA
2957	58	ENVISION
2958	58	REATTA
2959	58	ELECTRA
2960	58	SKYHAWK
2961	58	SOMERSET
2962	58	REGAL TOURX
2963	58	ENCORE GX
2964	58	ENVISTA
2965	59	ATS
2966	59	CTS
2967	59	ELR
2968	59	XTS
2969	59	ESCALADE
2970	59	SRX
2971	59	STS
2972	59	DTS
2973	59	XLR
2974	59	LIMOUSINE
2975	59	HEARSE
2976	59	ESCALADE ESV
2977	59	DEVILLE
2978	59	ELDORADO
2979	59	CATERA
2980	59	SEVILLE
2981	59	COMMERCIAL CHASSIS
2982	59	FLEETWOOD
2983	59	CT6
2984	59	XT5
2985	59	FUNERAL COACH
2986	59	ARMORED VEHICLE
2987	59	STRETCH LIMOUSINE
2988	59	60 SPECIAL
2989	59	ALLANTE
2990	59	BROUGHAM
2991	59	CIMARRON
2992	59	XT4
2993	59	XT6
2994	59	CT4
2995	59	CT5
2996	59	LYRIQ
2997	59	ESCALADE IQ
2998	59	CELESTIQ
2999	59	OPTIQ
3000	59	VISTIQ
3001	59	ESCALADE IQL
3002	60	VOLT
3003	60	EQUINOX
3004	60	ACADIA
3005	61	AMPERA
3006	61	ROADSTER
3007	61	OPEL
3008	61	SINTRA
3009	61	AMPERA-E
3010	61	AMPERA-E EV
3011	62	ACADIA
3012	62	SAVANA
3013	62	SIERRA
3014	62	TERRAIN
3015	62	YUKON
3016	62	CANYON
3017	62	ENVOY
3018	62	YUKON XL
3019	62	W4
3020	62	SAFARI
3021	62	ELECTRIC VEHICLE
3022	62	GMT-400
3023	62	SONOMA
3024	62	SUBURBAN
3025	62	C/K PICKUP
3026	62	JIMMY UTILITY
3027	62	T-SERIES
3028	62	C4
3029	62	C5
3030	62	C6
3031	62	C7
3032	62	C8
3033	62	W5
3034	62	W7
3035	62	W3
3036	62	B7
3037	62	W6
3038	62	P6S
3039	62	D7
3040	62	P TRUCK FORWARD
3041	62	MOTORHOME CHASSIS
3042	62	CUTAWAY CHASSIS
3043	62	S15 UTILITY
3044	62	VANDURA
3045	62	CUTAWAY VAN
3046	62	RALLY
3047	62	MAGNA VAN
3048	62	TYPHOON
3049	62	VALUE VAN
3050	62	HI-CUBE
3051	62	S7
3052	62	GEO TRACKER
3053	62	S6
3054	62	JIMMY
3055	62	R CONVENTIONAL
3056	62	V CONVENTIONAL
3057	62	S15 PICKUP
3058	62	FORWARD CONTROL
3059	62	ALUMINUM TILT
3060	62	HEAVY CONVENTIONAL
3061	62	BUS CHASSIS
3062	62	CABALLERO
3063	62	TRANSIT COACH
3064	62	ARTICULATED COACH
3065	62	SIERRA HD
3066	62	SIERRA LIMITED
3067	62	W3500/W4500
3068	62	W5500/W5500 HD
3069	62	HUMMER EV SUV
3070	62	CRUISE ORIGIN AV
3071	62	HUMMER EV PICKUP
3072	63	TRIBUTE
3073	63	MX-5
3074	63	RX-8
3075	63	MAZDA3
3076	63	MAZDA5
3077	63	CX-7
3078	63	CX-9
3079	63	MAZDA6
3080	63	MAZDA2
3081	63	MPV
3082	63	CX-5
3083	63	B-SERIES
3084	63	PROTEGE
3085	63	MILLENIA
3086	63	626
3087	63	323
3088	63	MX-3
3089	63	929
3090	63	RX-7
3091	63	MX-6
3092	63	CX-3
3093	63	GLC
3094	63	NAVAJO
3095	63	CX-30
3096	63	MX-30
3097	63	CX-50
3098	63	CX-90
3099	63	CX-70
3100	64	ACCORD
3101	64	CIVIC
3102	64	PILOT
3103	64	CR-V
3104	64	RIDGELINE
3105	64	ELEMENT
3106	64	ODYSSEY
3107	64	INSIGHT
3108	64	FCX CLARITY
3109	64	FIT
3110	64	CR-Z
3111	64	S2000
3112	64	PCX150
3113	64	CB1100
3114	64	CRF250
3115	64	CTX1300
3116	64	CTX700
3117	64	GOLD WING
3118	64	NC700X
3119	64	METROPOLITAN
3120	64	NPS50 (RUCKUS)
3121	64	ST1300PA
3122	64	ST1300
3123	64	SILVERWING
3124	64	CBR250
3125	64	VFR1200F (INTERCEPTOR 1200)
3126	64	NT700V
3127	64	PCX125
3128	64	SH150I
3129	64	ELITE 80
3130	64	HELIX
3131	64	VT600 (SHADOW VLX)
3132	64	ST1300P
3133	64	599
3134	64	CBR1100X
3135	64	CBR954RR
3136	64	ST1100P
3137	64	ST1100
3138	64	ELITE 50
3139	64	CBR900RR
3140	64	PACIFIC COAST
3141	64	VFR750F
3142	64	XR250L
3143	64	VT1100 (SHADOW 1100)
3144	64	SHADOW
3145	64	CT70
3146	64	RC 45
3147	64	HAWK GT
3148	64	CB-1
3149	64	ELITE 250
3150	64	TOURIST TROPHY
3151	64	NS50F
3152	64	NX250
3153	64	NX125
3154	64	SA50
3155	64	SB50P
3156	64	RC30
3157	64	XL600V
3158	64	ELITE
3159	64	TRANSALP
3160	64	NX650
3161	64	PRELUDE
3162	64	PASSPORT
3163	64	CROSSTOUR
3164	64	HR-V
3165	64	DEL SOL
3166	64	CBR650
3167	64	CB500
3168	64	CRF50
3169	64	XR400R
3170	64	TRX700XX
3171	64	TRX450ER
3172	64	FOURTRAX
3173	64	TRX400X
3174	64	SPORTRAX
3175	64	TRX450R
3176	64	CRF70F
3177	64	CRF100F
3178	64	CR250R
3179	64	SA50P
3180	64	CR125R
3181	64	XR250R
3182	64	BIG RED
3183	64	EV PLUS
3184	64	TRX90X
3185	64	XR600R
3186	64	TRX200D
3187	64	TRX200DN
3188	64	TRX250
3189	64	TRX300
3190	64	TRX300EX
3191	64	TRX300EXN
3192	64	TRX300FW
3193	64	TRX300FWN
3194	64	TRX300N
3195	64	TRX400FW
3196	64	TRX400FWN
3197	64	TRX450S
3198	64	TRX450ES
3199	64	TRX400EX
3200	64	REBEL
3201	64	NC700JD (NM4)
3202	64	VT1300 (STATELINE)
3203	64	XR650R
3204	64	FOURTRAX RANCHER
3205	64	TRX420
3206	64	FOURTRAX FOREMAN
3207	64	TRX680 (RINCON)
3208	64	FOURTRAX RINCON
3209	64	NCH50 (GIORNO)
3210	64	NCH50 (METROPOLITAN)
3211	64	NSS300 (FORZA)
3212	64	CRF110
3213	64	CRF125
3214	64	MRT260/COTA 4RT260
3215	64	CBR500
3216	64	NC750X
3217	64	CBR300
3218	64	TRX250X
3219	64	TRX450R/TRX450ER
3220	64	FOURTRAX RECON
3221	64	CBR125
3222	64	MSX125 (GROM)
3223	64	NC750S
3224	64	ST1300A
3225	64	VT1300 (SABRE)
3226	64	CBR1000F
3227	64	ST1300A/ST1300
3228	64	CRF80F
3229	64	NC700S
3230	64	CBF1000
3231	64	VT750 (SHADOW AERO 750)
3232	64	CBF600
3233	64	MRT260/COTA 4RT/4RT 260
3234	64	VT1300 (FURY)
3235	64	VT750 (SHADOW PHANTOM 750)
3236	64	VT750 (SHADOW ACE 750)
3237	64	VT750 (SHADOW TOURER)
3238	64	SILVER WING
3239	64	ELITE 110
3240	64	SH150D/SH150I
3241	64	INTERSTATE
3242	64	DN-01
3243	64	VARADERO
3244	64	CRF150
3245	64	TRX300X
3246	64	TRX450ERB
3247	64	TRX500
3248	64	CHF50 (METROPOLITAN)
3249	64	CHF50 (JAZZ)
3250	64	GL1100 (GOLDWING)
3251	64	GL1200 (GOLDWING)
3252	64	VT1100 (SHADOW SPIRIT 1100)
3253	64	NRX1800 (VALKYRIE RUNE)
3254	64	CB599
3255	64	CB900
3256	64	919
3257	64	RC51
3258	64	XL200R
3259	64	CR85R
3260	64	CG150ESD
3261	64	XR200R
3262	64	NSR50MIN
3263	64	TRX700EX
3264	64	TRX350FE
3265	64	TRX350FM
3266	64	TRX350TE
3267	64	TRX350TM
3268	64	TRX400FA
3269	64	TRX400FG (FOURTRAX 400)
3270	64	TRX450FM
3271	64	TRX500 (FOURTRAX)
3272	64	TRX650FA (RINCON)
3273	64	TRX650FG (RINCON)
3274	64	NSS250 (REFLEX)
3275	64	BIG RUCKUS
3276	64	VT600 (SHADOW VLX DELUXE)
3277	64	TRX250 (SPORTTRAX 250)
3278	64	TRX300EX (SPORTTRAX 300)
3279	64	TRX400EX (SPORTTRAX 400)
3280	64	TRX450ERB (SPORTTRAX 450)
3281	64	TRX450ER (SPORTTRAX 450)
3282	64	TRX250 (FOURTRAX 250)
3283	64	TRX400FA (FOURTRAX RANCHER AT)
3284	64	TRX400FGA (FOURTRAX RANCHER AT)
3285	64	CH80 (ELITE)
3286	64	CN250 (HELIX)
3287	64	SPORT TOURER
3288	64	CB900 (HORNET)
3289	64	RVT1000R (RC51)
3290	64	TRX90 (FOURTRAX 90)
3291	64	TRX350FE (FOURTRAX RANCHER)
3292	64	TRX350FM (FOURTRAX RANCHER)
3293	64	TRX350TE (FOURTRAX RANCHER)
3294	64	TRX350TM (FOURTRAX RANCHER)
3295	64	RC213V
3296	64	TRX90 (SPORTTRAX 90)
3297	64	TRX250 (RECON)
3298	64	TRX400FW (FOURTRAX FOREMAN 400)
3299	64	TRX450FE (FOURTRAX FOREMAN)
3300	64	TRX450FM (FOURTRAX FOREMAN)
3301	64	TRX650FA (FOURTRAX RINCON)
3302	64	TRX650FGA (FOURTRAX RINCON)
3303	64	CRF1000
3304	64	VFR1200X (CROSSTOURER)
3305	64	TRX400FGA
3306	64	CB750 (NIGHTHAWK 750)
3307	64	CBR900/CBR954
3308	64	CBR929RR
3309	64	VALKYRIE
3310	64	XR70R
3311	64	XR50R
3312	64	CR80R
3313	64	XR80R
3314	64	XR100R
3315	64	ST1100A
3316	64	VT1100 (SHADOW AERO)
3317	64	GL1500C (VALKYRIE)
3318	64	GL1500CD (VALKYRIE TOURER)
3319	64	VALKYRIE TOURER
3320	64	VALKYRIE INTERSTATE
3321	64	GL1500SE (GOLD WING SE)
3322	64	VT1100 (SHADOW ACE TOURER)
3323	64	CR500R
3324	64	VF750 (MAGNA V45)
3325	64	GL1500A (GOLD WING ASPENCADE)
3326	64	VT1100 (SHADOW ACE)
3327	64	Z50R
3328	64	PC800 (PACIFIC COAST)
3329	64	XR200
3330	64	GOLD WING INTERSTATE
3331	64	EZ90
3332	64	RC45
3333	64	TRX400FG
3334	64	COTA
3335	64	CBR600
3336	64	CLARITY
3337	64	CH250
3338	64	SE50PI
3339	64	CH150
3340	64	SE50H
3341	64	SE50PH
3342	64	NQ50 (SPREE)
3343	64	CMX450C
3344	64	VT700 (SHADOW 700)
3345	64	XL250R
3346	64	XL600R
3347	64	TLR200
3348	64	CN250
3349	64	NB50 (AERO 50)
3350	64	VF1000R
3351	64	VF500 (INTERCEPTOR 500)
3352	64	CB450
3353	64	TG50 (GYRO S)
3354	64	CB700 (NIGHTHAWK S)
3355	64	VF1100 (MAGNA V65)
3356	64	VT500 (SHADOW 500)
3357	64	XL80
3358	64	XL100S
3359	64	VF1100 (SABRE V65)
3360	64	VF1000F (INTERCEPTOR 1000)
3361	64	XL350R
3362	64	NH80 (AERO 80)
3363	64	CB125
3364	64	VF700 (MAGNA V42)
3365	64	NN50 (GYRO)
3366	64	XL125
3367	64	CMX300 (REBEL 300)
3368	64	CMX500 (REBEL 500)
3369	64	NCW50 (METROPOLITAN)
3370	64	CRF1000 (AFRICA TWIN)
3371	64	CBF300
3372	64	CRF450
3373	64	Z125 (MONKEY)
3374	64	GL1800 (GOLDWING)
3375	64	CRF1100 (AFRICA TWIN)
3376	64	VT800 (SHADOW 800)
3377	64	CH125
3378	64	CM200
3379	64	CM250C
3380	64	CX500
3381	64	CM450
3382	64	VF500 (MAGNA V30)
3383	64	XL500S
3384	64	XR500R
3385	64	CB750
3386	64	CB650
3387	64	VF750 (SABRE V45)
3388	64	CB550
3389	64	CX650
3390	64	ACCORD CROSSTOUR
3391	64	ADV150
3392	64	FIREBLADE
3393	64	CBX
3394	64	FOURTRAX FOREMAN RUBICON
3395	64	COTA 300RR (MRT300)
3396	64	WW150/PCX150
3397	64	SXS1000M (PIONEER 1000)
3398	64	SXS700M (PIONEER 700)
3399	64	SXS500M (PIONEER 500)
3400	64	TRX420 (RANCHER)
3401	64	TRX500 (FOREMAN)
3402	64	TRX500 (FOREMAN RUBICON)
3403	64	TRX500 (RUBICON)
3404	64	CB300
3405	64	CB1000
3406	64	TRAIL125
3407	64	CRF300L
3408	64	MONKEY
3409	64	CIVIC SI
3410	64	NAVI
3411	64	CMX300
3412	64	PCX
3413	64	RUCKUS
3414	64	TRX520
3415	64	SXS520M (PIONEER 520)
3416	64	ATC350X
3417	64	ATC250
3418	64	CM400
3419	64	VF700 (SABRE V42)
3420	64	VF700 (INTERCEPTOR 700)
3421	64	CIVIC TYPE R
3422	64	XR150L
3423	64	NU50 (URBAN EXPRESS)
3424	64	NC50 (EXPRESS)
3425	64	XR350R
3426	64	SCL500
3427	64	ADV160
3428	64	PROLOGUE
3429	64	NCW50 (GIORNO)
3430	64	CRF230L
3431	64	CRF230M
3432	64	CRF230F
3433	64	CRF125F
3434	64	CRF125FB
3435	64	CRF150F
3436	64	CRF150R
3437	64	CRF150RB
3438	64	CRF250L
3439	64	CRF250R
3440	64	CRF250X
3441	64	CRF50F
3442	64	CRF110F
3443	64	CRF450R
3444	64	CRF450X
3445	64	CRF250RX
3446	64	CRF250F
3447	64	CRF450RX
3448	64	CRF450RWE
3449	64	CRF1000A
3450	64	CRF1000D
3451	64	CRF1000LA
3452	64	CRF1000LD
3453	64	CRF150RE
3454	64	CRF150RBE
3455	64	CRF250RB
3456	64	CRF450RB
3457	64	CRF250RL
3458	64	CRF250RLA
3459	64	CRF250LA
3460	64	CRF450RL
3461	64	CRF1100D
3462	64	CRF1100A
3463	64	CRF1100A4
3464	64	CRF1100D4
3465	64	CRF1000A2
3466	64	CRF1000D2
3467	64	CRF11004D
3468	64	CRF11004
3469	64	CRF450L
3470	64	CRF1100LD
3471	64	CRF1100L
3472	64	CRF1100L4D
3473	64	CRF1100L4
3474	64	CRF1000AS
3475	64	CRF1000ASD
3476	64	XR650L
3477	64	CBR125R
3478	64	CBR600RR
3479	64	CBR600RA
3480	64	CBR500R
3481	64	CBR500RA
3482	64	CB500FA
3483	64	CB500F
3484	64	CB500XA
3485	64	CB500X
3486	64	CBR650F
3487	64	CBR650FA
3488	64	CBR1000RR
3489	64	CBR1000RA
3490	64	CBR1000S
3491	64	CB1000R
3492	64	CBR250R
3493	64	CBR250RA
3494	64	CBR300R
3495	64	CBR300RA
3496	64	CB300F
3497	64	CB300FA
3498	64	CB650F
3499	64	CBF300N
3500	64	CB300R
3501	64	CBR650R
3502	64	CB650R
3503	64	XR650LL
3504	64	CTX700N
3505	64	CBR650RA
3506	64	CB650RA
3507	64	ST1100L
3508	64	ST1100AL
3509	64	NX500
3510	64	MONTESA COTA
3511	64	DAX125
3512	64	AFRICA TWIN
3513	64	FURY
3514	64	NT1100
3515	64	TRX700 (RUBICON 700)
3516	64	SHADOW PHANTOM
3517	64	GIORNO
3518	64	FOREMAN
3519	64	RUBICON
3520	64	FOREMAN RUBICON
3521	64	RANCHER
3522	64	RECON
3523	64	RINCON
3524	64	REBEL 1100
3525	64	REBEL 300
3526	64	REBEL 500
3527	64	SHADOW AERO
3528	64	GOLD WING TOUR
3529	64	GROM
3530	64	SUPER CUB C125
3531	64	AFRICA TWIN ADVENTURE SPORTS
3532	64	SXS1000S (TALON 1000)
3533	64	CBR600F
3534	64	JAZZ
3535	64	CG150
3536	64	CB500 HORNET
3537	64	CB50R
3538	64	VTR250 (INTERCEPTOR 250)
3539	64	VTR1000F (SUPER HAWK)
3540	64	VTX1300
3541	64	VTX1800
3542	64	VT1100 (SHADOW SABRE)
3543	64	VF750 (INTERCEPTOR 750)
3544	64	VFR800 (INTERCEPTOR 800)
3545	64	VT1300 (INTERSTATE)
3546	64	COTA 4RT 260R
3547	64	COTA 310RR
3548	64	CRF300F
3549	64	FOURTRAX RUBICON
3550	64	VT750 (SHADOW SPIRIT 750)
3551	64	VT750 (SHADOW RS 750)
3552	64	VT500 (ASCOT)
3553	64	CHF50P (METROPOLITAN II)
3554	64	CB250 (NIGHTHAWK 250)
3555	64	NC750JD (NM4)
3556	64	SXS5M2 (PIONEER 520)
3557	64	CB1000 HORNET
3558	65	ZDX
3559	65	RDX
3560	65	RL
3561	65	TL
3562	65	TSX
3563	65	MDX
3564	65	RLX
3565	65	ILX
3566	65	RSX
3567	65	INTEGRA
3568	65	CL
3569	65	NSX
3570	65	LEGEND
3571	65	TLX
3572	65	SLX
3573	65	VIGOR
3574	65	ADX
3575	66	AVENGER
3576	66	CHALLENGER
3577	66	CHARGER
3578	66	CALIBER
3579	66	VIPER
3580	66	RAM
3581	66	JOURNEY
3582	66	NITRO
3583	66	DAKOTA
3584	66	CARAVAN/GRAND CARAVAN
3585	66	RAM CHASSIS CAB
3586	66	DART
3587	66	SPRINTER
3588	66	DURANGO
3589	66	CHASSIS WITH POWERTRAIN
3590	66	MAGNUM
3591	66	INTREPID
3592	66	STRATUS
3593	66	NEON
3594	66	COLT
3595	66	STEALTH
3596	66	RAMCHARGER
3597	66	RAM VAN
3598	66	RAM WAGON
3599	66	SPIRIT
3600	66	SHADOW
3601	66	DYNASTY
3602	66	DAYTONA
3603	66	MONACO
3604	66	OMNI
3605	66	SHELBY CHARGER
3606	66	ARIES
3607	66	600
3608	66	DIPLOMAT
3609	66	LANCER
3610	66	CONQUEST
3611	66	400
3612	66	MIRADA
3613	66	ST.REGIS
3614	66	CARAVAN
3615	66	GRAND CARAVAN
3616	66	RAM 50
3617	66	D-SERIES
3618	66	W-SERIES
3619	66	RAIDER
3620	66	MINI RAM
3621	66	ROYAL MINI RAM VAN
3622	66	D50
3623	66	RAMPAGE
3624	66	RD200 / RD250
3625	66	HORNET
3626	67	CIRRUS
3627	67	SEBRING
3628	67	300
3629	67	TOWN AND COUNTRY
3630	67	GRAND VOYAGER
3631	67	200
3632	67	PT CRUISER
3633	67	CROSSFIRE
3634	67	PACIFICA
3635	67	ASPEN
3636	67	CONCORDE
3637	67	INTREPID
3638	67	NEW YORKER
3639	67	LHS
3640	67	VISION
3641	67	STRATUS
3642	67	VIPER
3643	67	NEON
3644	67	SHADOW
3645	67	PROWLER
3646	67	CARAVAN
3647	67	TC
3648	67	LEBARON
3649	67	CONCORDE/LHS
3650	67	DAYTONA
3651	67	DYNASTY
3652	67	IMPERIAL
3653	67	SALON
3654	67	LASER
3655	67	NEWPORT
3656	67	FIFTH AVENUE
3657	67	CONQUEST
3658	67	EXECUTIVE
3659	67	E-CLASS
3660	67	CORDOBA
3661	67	VOYAGER
3662	67	300C
3663	67	GRAND CARAVAN
3664	68	GT-R
3665	68	VERSA
3666	68	VERSA NOTE
3667	68	ALTIMA
3668	68	LEAF
3669	68	370Z
3670	68	SENTRA
3671	68	PATHFINDER
3672	68	JUKE
3673	68	ROGUE
3674	68	MURANO
3675	68	ARMADA
3676	68	XTERRA
3677	68	QUEST
3678	68	NV200
3679	68	FRONTIER
3680	68	TITAN
3681	68	NV
3682	68	MAXIMA
3683	68	350Z
3684	68	X-TRAIL
3685	68	CUBE
3686	68	240SX
3687	68	300ZX
3688	68	PICKUP
3689	68	ALTRA-EV
3690	68	NX
3691	68	STANZA
3692	68	AXXESS
3693	68	PULSAR
3694	68	VAN
3695	68	STANZA WAGON
3696	68	200SX
3697	68	ROGUE SPORT
3698	68	SENTRA CLASSIC
3699	68	ALTRA
3700	68	MICRA
3701	68	ROGUE SELECT
3702	68	KICKS
3703	68	NISSAN Z
3704	68	ARIYA HATCHBACK
3705	68	KICKS PLAY
3706	68	KICKS MPV
3707	68	ARIYA MPV
3708	69	QX50
3709	69	Q40
3710	69	Q50
3711	69	Q60
3712	69	Q70
3713	69	QX70
3714	69	QX80
3715	69	QX60
3716	69	Q70L
3717	69	Q45
3718	69	G35
3719	69	M35
3720	69	M45
3721	69	FX35
3722	69	FX45
3723	69	QX56
3724	69	G37
3725	69	EX35
3726	69	FX50
3727	69	M56
3728	69	M37
3729	69	G25
3730	69	M35H
3731	69	FX37
3732	69	JX35
3733	69	J30
3734	69	G20
3735	69	I35
3736	69	I30
3737	69	QX4
3738	69	M30
3739	69	QX30
3740	69	QX55
3741	69	QX65
3742	70	RAIDER
3743	70	OUTLANDER
3744	70	LANCER
3745	70	GALANT
3746	70	ECLIPSE
3747	70	ENDEAVOR
3748	70	MONTERO
3749	70	RVR
3750	70	I-MIEV
3751	70	MIRAGE
3752	70	EXPO
3753	70	3000GT
3754	70	DIAMANTE
3755	70	TRUCK
3756	70	MONTERO SPORT
3757	70	LANCER SPORTBACK
3758	70	LANCER EVOLUTION
3759	70	MIRAGE G4
3760	70	OUTLANDER SPORT
3761	70	PRECIS
3762	70	SPACE WAGON
3763	70	WAGON
3764	70	SIGMA
3765	70	STARION
3766	70	VAN
3767	70	TREDIA
3768	70	CORDIA
3769	70	MIGHTY MAX
3770	70	SPX
3771	70	SP
3772	70	ECLIPSE CROSS
3773	70	LOW SPEED VEHICLE
3774	71	ROUTAN
3775	71	GOLF
3776	71	PASSAT
3777	71	PHAETON
3778	71	TOUAREG
3779	71	JETTA
3780	71	GTI
3781	71	R32
3782	71	JETTA WAGON
3783	71	RABBIT
3784	71	EOS
3785	71	GOLF SPORTWAGEN
3786	71	GOLF III
3787	71	CORRADO
3788	71	EUROVAN
3789	71	E-GOLF
3790	71	BEETLE
3791	71	CC
3792	71	TIGUAN
3793	71	JETTA SPORTWAGEN
3794	71	CABRIO
3795	71	GOLF GTI
3796	71	GOLF R
3797	71	CABRIOLET
3798	71	FOX
3799	71	QUANTUM
3800	71	SCIROCCO
3801	71	VANAGON
3802	71	DASHER
3803	71	KOMBI
3804	71	ATLAS
3805	71	GOLF ALLTRACK
3806	71	TIGUAN LIMITED
3807	71	ARTEON
3808	71	GLI
3809	71	ATLAS CROSS SPORT
3810	71	ID.4
3811	71	TAOS
3812	71	JETTA GLI
3813	71	ID. BUZZ
3814	72	S60
3815	72	S80
3816	72	V60
3817	72	XC60
3818	72	XC70
3819	72	S40
3820	72	V50
3821	72	C70
3822	72	V70
3823	72	XC90
3824	72	C30
3825	72	9700
3826	72	940 SERIES
3827	72	960 SERIES
3828	72	850 SERIES
3829	72	V60CC
3830	72	S60 CROSS COUNTRY
3831	72	S90
3832	72	V90
3833	72	V90CC
3834	72	240 SERIES
3835	72	740 SERIES
3836	72	780 SERIES
3837	72	760 SERIES
3838	72	B10M
3839	72	V40
3840	72	S70
3841	72	CAB OVER ENGINE HT
3842	72	CAB OVER ENGINE LT
3843	72	F12 W/F7 CAB
3844	72	F6 W/F7 CAB
3845	72	CAB BEHIND ENGINE
3846	72	VOLVO TRAILERS
3847	72	260 SERIES
3848	72	XC40
3849	72	VT
3850	72	VS
3851	72	C70 / C30
3852	72	C40
3853	72	B12R
3854	72	B7R
3855	72	B12B
3856	72	B12M
3857	72	B9TL
3858	72	B9R
3859	72	B9S
3860	72	B9L
3861	72	BXR
3862	72	B5R
3863	72	BRLH
3864	72	BXXR
3865	72	BFE
3866	72	BXRB
3867	72	B8R
3868	72	BRH
3869	72	B5TL
3870	72	BE
3871	72	B8L
3872	72	B13R
3873	72	EX30
3874	72	EX90
3875	72	EC40
3876	72	EX40
3877	72	EX30 CC
3878	72	EX60
3879	73	500L
3880	73	500
3881	73	FREEMONT
3882	73	500X
3883	73	124 SPIDER
3884	73	SPIDER 2000
3885	73	X 1/9
3886	73	BRAVA
3887	73	STRADA
3888	73	DUCATO
3889	73	500E
3890	74	4C
3891	74	8C COMPETIZIONE SPIDER
3892	74	164
3893	74	GIULIA (952)
3894	74	SPIDER
3895	74	MILANO
3896	74	GTV6
3897	74	STELVIO
3898	74	TONALE
3899	75	THEMA
3900	75	FLAVIA
3901	75	RTL53
3902	76	EQUUS
3903	76	SANTA FE
3904	76	TUCSON
3905	76	VELOSTER
3906	76	GENESIS COUPE
3907	76	SONATA
3908	76	ELANTRA
3909	76	ENTOURAGE
3910	76	AZERA
3911	76	VERACRUZ
3912	76	ACCENT
3913	76	GENESIS
3914	76	TIBURON
3915	76	ELANTRA TOURING
3916	76	XG350
3917	76	EXCEL
3918	76	SCOUPE
3919	76	XG300
3920	76	ELANTRA GT
3921	76	PONY
3922	76	STELLAR
3923	76	SANTA FE SPORT
3924	76	IONIQ
3925	76	KONA
3926	76	SANTA FE XL
3927	76	NEXO
3928	76	PALISADE
3929	76	VENUE
3930	76	VELOSTER N
3931	76	SANTA CRUZ
3932	76	IONIQ 5
3933	76	ELANTRA N
3934	76	XCIENT
3935	76	IONIQ 6
3936	76	KONA N
3937	76	IONIQ 5 N
3938	76	IONIQ 9
3939	76	IONIQ 6 N
3940	77	RIO
3941	77	SOUL
3942	77	BORREGO
3943	77	FORTE
3944	77	RONDO
3945	77	OPTIMA
3946	77	SEDONA
3947	77	SORENTO
3948	77	SPORTAGE
3949	77	CADENZA
3950	77	K900
3951	77	SEPHIA
3952	77	SPECTRA
3953	77	AMANTI
3954	77	FORTE KOUP
3955	77	NIRO
3956	77	STINGER
3957	77	TELLURIDE
3958	77	SELTOS
3959	77	K5
3960	77	CARNIVAL
3961	77	EV6
3962	77	EV9
3963	77	K4
3964	78	MURCIELAGO
3965	78	GALLARDO
3966	78	DIABLO
3967	78	147
3968	78	AVENTADOR
3969	78	HURACAN
3970	78	URUS
3971	78	ROADSTER
3972	78	REVUELTO
3973	78	TEMERARIO
3974	79	SMART
3975	79	FORTWO
3976	79	EQ FORTWO
3977	79	FORTWO ELECTRIC DRIVE
3978	80	DR200SE
3979	80	GZ250
3980	80	AN400 / AN400S
3981	80	DR-Z400SL
3982	80	GSX600F/GSX600FT
3983	80	GSX-R600L
3984	80	GSF650S
3985	80	GSF650SA
3986	80	DR650SEL
3987	80	SV650/SV650S/SV650SF
3988	80	AN650L
3989	80	AN650A
3990	80	LS650L
3991	80	DL650L
3992	80	GSX750F/GSX750FT
3993	80	VS800
3994	80	VZ800/VZ800Z
3995	80	VL800 / VL800T / VL800C/VL800B
3996	80	DL1000
3997	80	SV1000 / SV1000S
3998	80	GSX-R1000L
3999	80	BANDIT 1250S
4000	80	GSX1300R
4001	80	VS1400/VS1400GL
4002	80	VL1500 / VL1500T
4003	80	VZR1800/VZR1800Z/VZR1800N
4004	80	LT-Z50/LT-Z50Z
4005	80	LT-Z250/ LT-Z250Z
4006	80	LT-F400F
4007	80	LT-Z400L/LT-Z400ZL
4008	80	LT-R450/LT-R450Z
4009	80	LT-F500F
4010	80	LT-A500F
4011	80	AERIO
4012	80	XL7
4013	80	SX4
4014	80	EQUATOR
4015	80	KIZASHI
4016	80	DR-Z70
4017	80	DR-Z125L
4018	80	DR-Z125LL
4019	80	DR-Z250
4020	80	DR-Z400E
4021	80	RM85
4022	80	RM85L
4023	80	RM125T
4024	80	RM-Z250L
4025	80	RM250/ RM250T
4026	80	RM-Z450L
4027	80	LT-Z90L
4028	80	LT-F400
4029	80	LT-A400
4030	80	LT-A450X
4031	80	JR80
4032	80	AN400
4033	80	AN400AL
4034	80	SV650A/SV650SA/SV650SAF
4035	80	VLR1800/VLR1800T
4036	80	SFV650L
4037	80	GSX650F
4038	80	GSF1250SA
4039	80	GSX1300BK
4040	80	GSX1300BKA
4041	80	VZ1500L
4042	80	VZ800L
4043	80	TU250XL
4044	80	VL1500L/VL1500BL/VL1500TL/VL1500BTL
4045	80	UH200L
4046	80	DL1000A/DL1000AA
4047	80	SWIFT
4048	80	FORENZA
4049	80	RENO
4050	80	ESTEEM
4051	80	VITARA
4052	80	SIDEKICK
4053	80	SIDEKICK SPORT
4054	80	X-90
4055	80	TL1000R
4056	80	GN125E/ GN125ET
4057	80	DR350SE
4058	80	GS500E/GS500ET
4059	80	GSF600S/GSF600ST
4060	80	LS650P
4061	80	VS800GL
4062	80	RF900R
4063	80	TL1000S
4064	80	GSX-R1100W
4065	80	GSF1200S/SA
4066	80	RM80T
4067	80	GSX-R750L
4068	80	VZR1800BZL
4069	80	VL1500BL/VL1500TL
4070	80	VL800L/VL800TL
4071	80	GSX1300RAL
4072	80	GSX-R1000AL
4073	80	DR200SL
4074	80	GSX-S750ZL/GSX-S750L
4075	80	GW250FL/GW250ZL
4076	80	DR-Z400SML
4077	80	UH200AL
4078	80	DL650XA/DL650A
4079	80	GW250/GW250F/GW250Z
4080	80	GSF1250SA/GSX1250SA
4081	80	GSX-S1000
4082	80	GSX-S1000A
4083	80	GSX-S1000F
4084	80	GSX-S1000FA
4085	80	LT-A50
4086	80	LT80
4087	80	LT-F160
4088	80	LT-F250L
4089	80	LT-F250F
4090	80	LT-F300F
4091	80	LT-Z400L
4092	80	GS500
4093	80	GSX600F
4094	80	GSF600S
4095	80	SV650/SV650S
4096	80	GSX750F
4097	80	VL800
4098	80	VS1400GLP
4099	80	VL1500
4100	80	JR50
4101	80	DR-Z400
4102	80	RM125
4103	80	RM250
4104	80	DR-Z110
4105	80	RM60
4106	80	RM65
4107	80	RM100
4108	80	GRAND VITARA
4109	80	GRAND VITARA XL-7
4110	80	GS500E
4111	80	GSF1200S
4112	80	SV650
4113	80	VERONA
4114	80	SAMURAI
4115	80	RV200L7
4116	80	SV650L7
4117	80	SV650AL7
4118	80	GSX-S1000AL7
4119	80	GSX-S1000FAL7
4120	80	GSX-R1000R
4121	80	DL650XAL7
4122	80	DL650XAL/DL650AAL/DL650AL
4123	80	DL1000AL/DL1000AAL
4124	80	DL650AAL/DL650AL
4125	80	VZR1800BZL/VZR1800L/VZR1800ZL
4126	80	GSX1300RAL/GSX1300RAZL
4127	80	GW250L
4128	80	VL800TL
4129	80	VL800BL/VL800CL/VL800L/VL800TL
4130	80	RM85LL
4131	80	DR200SEL
4132	80	DL650AL
4133	80	VL800CL/VL800L/VL800TL
4134	80	VZR1800L/VZR1800ZL
4135	80	DL1000L
4136	80	GSX1250FAL
4137	80	GSX1300RL/GSX1300RZL
4138	80	DL650A
4139	80	GSX1300RL
4140	80	AN400L
4141	80	LT-A500
4142	80	LT-F250
4143	80	LT-F400FU
4144	80	LT-R450
4145	80	LT-R450Z
4146	80	LT-Z400/LT-Z400Z
4147	80	LT-Z90
4148	80	RM-Z250
4149	80	RM-Z450
4150	80	DR-Z400S
4151	80	DR650SE
4152	80	DR-Z125
4153	80	RMX450
4154	80	DL650
4155	80	GSX-R600
4156	80	GSX-R750
4157	80	GSX1250FA
4158	80	GS500(GS500H)/GS500F(GS500FH)
4159	80	GSX650FA
4160	80	LS650
4161	80	SFV650
4162	80	SFV650A
4163	80	TU250X
4164	80	VZ1500
4165	80	VL800/VL800C/VL800T
4166	80	VZR1800/VZR1800Z
4167	80	AN400A
4168	80	AN650
4169	80	AN650AL
4170	80	UZ125C
4171	80	LT-F500F/QUADRUNNER
4172	80	GSX-R1000
4173	80	VS1400
4174	80	LT-Z250
4175	80	LT-Z50
4176	80	VZ800/VZ800B/VZ800Z
4177	80	SV650A/SV650SA
4178	80	VZ800
4179	80	SV1000S
4180	80	VZR1800
4181	80	LT-Z250K
4182	80	LT-F400F/LT-F400FC
4183	80	LT-A400F/LT-A400FC/LT-A400FH
4184	80	LT-A500F/LT-A500FC
4185	80	GSF1200
4186	80	GSF1200S/GSF1200SZ
4187	80	LT-A400F/LT-A400FZ
4188	80	LT-Z400Z
4189	80	QUV620F
4190	80	VL800/VL800T/VL800Z
4191	80	GSX600FK
4192	80	LT-V700F
4193	80	VZ1600
4194	80	GS500FK
4195	80	GSX-R600K
4196	80	GSX750FK
4197	80	GSX-R750K
4198	80	GSX-R1000K
4199	80	GSF1200SK
4200	80	GSX1300RK
4201	80	GZ250K
4202	80	LS650PK
4203	80	DL650K
4204	80	VS800GLK
4205	80	VZ800K
4206	80	VL800K
4207	80	DL1000K
4208	80	VS1400GLPK
4209	80	VL1500K
4210	80	DR200SEK
4211	80	DR-Z400SK
4212	80	DR650SEK
4213	80	AN400K
4214	80	AN650K
4215	80	JR80K
4216	80	JR50K
4217	80	DR-Z125K
4218	80	DR-Z125LK
4219	80	DR-Z250K
4220	80	DR-Z400K
4221	80	DR-Z400EK
4222	80	RM85K
4223	80	RM125K
4224	80	RM85LK
4225	80	RM250K
4226	80	LT80K
4227	80	LT160K
4228	80	LT-F250FK
4229	80	LT-F250K
4230	80	LT-F400K
4231	80	LT-A400K
4232	80	LT-F400FK
4233	80	LT-A400FK
4234	80	LT-Z400K
4235	80	LT-F500FK
4236	80	LT-A500FK
4237	80	RM60K
4238	80	RM65K
4239	80	RM100K
4240	80	DR-Z110K
4241	80	RM-Z250K
4242	80	VZ1600K
4243	80	GSF600SK
4244	80	GSF1200SK/GSF1200K
4245	80	SV650K/SV650SK
4246	80	TL1000RK
4247	80	SV1000K / SV1000SK
4248	80	GS500K
4249	80	RM80
4250	80	DS80
4251	80	DR350
4252	80	GN125E
4253	80	RMX250
4254	80	LT-F4WDX
4255	80	LT-F4WD
4256	80	RF600R
4257	80	DR125SE
4258	80	DR250SE
4259	80	GSX-R750W
4260	80	LOW SPEED VEHICLE
4261	80	GSX-R600W
4262	80	GSF400
4263	80	GSX1100G
4264	80	DR650S
4265	80	VX800
4266	80	FORSA
4267	80	GSX-R1100
4268	80	GS550L
4269	80	GS700E
4270	80	GS1150
4271	80	SP600
4272	80	GV700GL
4273	80	GV1200GL
4274	80	BUSINESS
4275	80	FAMILY
4276	80	TOURING
4277	80	LEISURE
4278	80	ENDURO
4279	80	OFF ROAD PLAY
4280	80	MINI-LEISURE
4281	80	MOTO-CROSS
4282	80	LS650BL7
4283	80	BOULEVARD M109R B.O.S.S.(VZR1800BZL8)
4284	80	BOULEVARD M90(VZ1500L8)
4285	80	BOULEVARD M50(VZ800L8)
4286	80	BOULEVARD S40(LS650BL8 )
4287	80	GSX-S750ZAL8 / GSX-S750L8
4288	80	GSX-S750L8
4289	80	RV200L8
4290	80	TU250XL8
4291	80	GSX250R
4292	80	SV650L8
4293	80	SV650AL8
4294	80	GSX-S1000FAL8
4295	80	GSX-S1000AL8 / GSX-S1000ZAL8
4296	80	HAYABUSA(GSX1300RAL8)
4297	80	BOULEVARD C90 B.O.S.S. (VL1500BL8)  / BOULEVA
4298	80	BOULEVARD C50(VL800L8) / BOULEVARD C50T(VL800
4299	80	V-STROM 650XT ADVENTURE
4300	80	V-STROM 650XT
4301	80	V-STROM 1000 ABS(DL1000AL8) / V-STROM 1000 XT
4302	80	DR650SEL8
4303	80	DR-Z400SL8
4304	80	DR200SL8
4305	80	DR-Z400SML8
4306	80	BURGMAN 650
4307	80	BOULEVARD M109R B.O.S.S. (VZR1800BZL9)
4308	80	BOULEVARD M90 (VZ1500L9)
4309	80	BOULEVARD M50 (VZ800L9)
4310	80	BOULEVARD C90 B.O.S.S. (VL1500BL9) / BOULEVAR
4311	80	BOULEVARD C50 (VL800L9) / BOULEVARD C50T (VL8
4312	80	BOULEVARD S40 (LS650BL9)
4313	80	GSX-Z750ZAL9 (50ST) / GSX-S750YAL9 (50ST) / G
4314	80	GSX-S750ZL9 (49ST)
4315	80	RV200L9
4316	80	TU250XL9
4317	80	SV650L9
4318	80	SV650AL9 / SV650XAL9
4319	80	GSX-S1000AL9/GSXS1000ZAL9/GSXS1000YAL9
4320	80	GSXS1000FZL9
4321	80	GSX1300RAL9 (HAYABUSA)
4322	80	DR650SEL9
4323	80	DR-Z400SL9
4324	80	DR200SL9
4325	80	DR-Z400SML9
4326	80	RMX450ZL
4327	80	DR-Z125LL/DR-Z125L
4328	80	LT-Z90L/QUADSPORT Z90
4329	80	LT-Z50L
4330	80	DL650XAAL9 (V-STROM 650XT TOURING)
4331	80	DL1000XAAL9 (V-STROM 1000XT ADVENTURE)
4332	80	GSXS1000SM0
4333	80	GSX1300RAM0 (HAYABUSA)
4334	80	BOULEVARD C50T
4335	80	BURGMAN 400
4336	80	BURGMAN 200
4337	80	GV1400
4338	80	VS700
4339	80	VS750 INTRUDER
4340	80	GSX1100
4341	80	GS750
4342	80	SP200
4343	80	GS450
4344	80	GSX1300 RK5
4345	80	DR-Z400SM
4346	80	DR200S
4347	80	V-STROM 1050
4348	80	V-STROM 1050XT
4349	80	SUZUKI BOULEVARD M109R B.O.S.S.
4350	80	GSX-S750
4351	80	V-STROM 650
4352	80	GSXS1000SM1
4353	80	GSX1300RRM2 / GSX1300RRZM2
4354	80	UH200AM2
4355	80	BOULEVARD
4356	80	GSX
4357	80	DR250F
4358	80	DR-Z50
4359	80	HAYABUSA
4360	80	KATANA
4361	80	DL1050
4362	80	V-STROM 800DE / V-STROM 800DE ADVENTURE
4363	80	GSX-8S
4364	80	GSX-S1000GT/GSX-S1000GT+
4365	80	V-STROM 800
4366	80	DR-Z12LM
4367	80	GSX-8R
4368	80	GSX-8T
4369	80	GSX-8TT
4370	80	KINGQUAD
4371	80	GSX-S1000GT+
4372	80	DR-Z4S
4373	81	GS
4374	81	LS
4375	81	SC
4376	81	IS
4377	81	LX
4378	81	RX
4379	81	GX
4380	81	ES
4381	81	CT
4382	81	HS
4383	81	RC
4384	81	LFA
4385	81	NX
4386	81	LC
4387	81	UX
4388	81	RZ
4389	81	TX
4390	82	LEGACY
4391	82	OUTBACK
4392	82	FORESTER
4393	82	IMPREZA
4394	82	XV CROSSTREK
4395	82	WRX
4396	82	BRZ
4397	82	BAJA
4398	82	B9 TRIBECA
4399	82	SVX
4400	82	CROSSTREK
4401	82	JUSTY
4402	82	LOYALE
4403	82	BRAT
4404	82	XT
4405	82	XT6
4406	82	DL
4407	82	GL
4408	82	GL-10
4409	82	RX
4410	82	STANDARD
4411	82	GLF
4412	82	ASCENT
4413	82	SOLTERRA
4414	82	TRAILSEEKER
4415	82	UNCHARTED
4416	83	62
4417	83	57
4418	84	VIBE
4419	84	G5
4420	84	SOLSTICE
4421	84	WAVE
4422	84	GRAND PRIX
4423	84	G6
4424	84	G8
4425	84	G3
4426	84	MONTANA SV6
4427	84	TORRENT
4428	84	PURSUIT
4429	84	GTO
4430	84	MATIZ
4431	84	BONNEVILLE
4432	84	SUNFIRE
4433	84	GRAND AM
4434	84	AZTEK
4435	84	FIREBIRD
4436	84	SUNBIRD
4437	84	TRANS SPORT
4438	84	FIREFLY
4439	84	LEMANS
4440	84	6000
4441	84	PARISIENNE
4442	84	FIERO
4443	84	T1000
4444	84	SUNBIRD 2000
4445	84	PHOENIX
4446	84	GRAND LEMANS
4447	84	CATALINA
4448	84	J2000
4449	84	SAFARI
4450	84	TEMPEST
4451	84	ACADIAN
4452	84	SUNBURST
4453	84	LAURENTIAN
4454	84	MONTANA
4455	85	TROOPER
4456	85	RODEO
4457	85	VEHICROSS
4458	85	NPR/NPR-HD
4459	85	NQR/NRR
4460	85	ASCENDER
4461	85	OASIS
4462	85	PICKUP
4463	85	AXIOM
4464	85	RODEO/AMIGO
4465	85	I-280
4466	85	HOMBRE
4467	85	T6F
4468	85	T7F
4469	85	T8F
4470	85	FRR
4471	85	NQR
4472	85	6000 SERIES MEDIUM DUTY
4473	85	7000 SERIES MEDIUM DUTY
4474	85	NPR
4475	85	H-SERIES
4476	85	F6
4477	85	F7
4478	85	IMPULSE
4479	85	I-MARK
4480	85	FSR
4481	85	FTR/FVR
4482	85	FTR/FVR/EVR
4483	85	STYLUS
4484	85	TROOPER II
4485	85	AMIGO
4486	85	NRR
4487	85	FORWARD CONTROL
4488	85	FORWARD CONTROL (FOR WALK-IN VAN)
4489	85	5000 SERIES MEDIUM DUTY
4490	85	4000 SERIES MEDIUM DUTY
4491	85	MEDIUM FRONT ENGINE BUS
4492	85	MEDIUM REAR ENGINE BUS
4493	85	FTR
4494	85	NPR-HD
4495	85	NPR-XD
4496	85	FVR
4497	85	I-350
4498	85	I-290
4499	85	I-370
4500	85	REACH
4501	86	TROPHY
4502	86	DAYTONA 675 R
4503	86	TRIDENT
4504	86	SPRINT
4505	86	TIGER
4506	86	LEGEND
4507	86	ADVENTURER
4508	86	THUNDERBIRD
4509	86	SPEED FOUR
4510	86	AMERICA
4511	86	BONNEVILLE
4512	86	SPEEDMASTER
4513	86	SCRAMBLER
4514	86	THRUXTON
4515	86	ROCKET III
4516	86	STREET TRIPLE
4517	86	TT600
4518	86	STREET TWIN
4519	86	STREET CUP
4520	86	TR7
4521	86	TR8
4522	86	STREET SCRAMBLER
4523	86	SPEED TWIN
4524	86	EXPLORER
4525	86	SPEED TRIPLE
4526	86	ROCKET 3
4527	86	DAYTONA
4528	86	SPEED
4529	86	DAYTONA 660
4530	86	ROCKET 3 STORM
4531	86	TIGER SPORT
4532	86	BOBBER TFC
4533	86	TF250
4534	86	TF450
4535	86	TRACKER
4536	87	9-3
4537	87	9-5
4538	87	9-4X
4539	87	9-7X
4540	87	900
4541	87	9000
4542	87	9-2X
4543	88	TT
4544	88	A4
4545	88	S4
4546	88	A6
4547	88	RS 6
4548	88	ALLROAD
4549	88	A8
4550	88	RS 4
4551	88	A3
4552	88	S6
4553	88	S8
4554	88	Q7
4555	88	A5
4556	88	S5
4557	88	R8
4558	88	TTS
4559	88	Q5
4560	88	RS 5
4561	88	A7
4562	88	TT RS
4563	88	Q3
4564	88	SQ5
4565	88	90
4566	88	100
4567	88	V8
4568	88	CABRIOLET
4569	88	S3
4570	88	S7
4571	88	RS 7
4572	88	A4 ALLROAD
4573	88	5000
4574	88	4000
4575	88	80
4576	88	200
4577	88	COUPE
4578	88	RS 3
4579	88	Q8
4580	88	E-TRON
4581	88	A6 ALLROAD
4582	88	Q5 E
4583	88	A8 E
4584	88	SQ7
4585	88	SQ8
4586	88	RS Q8
4587	88	E-TRON SPORTBACK
4588	88	RS E-TRON GT
4589	88	Q4
4590	88	A8 L
4591	88	E-TRON GT
4592	88	A7 E
4593	88	A8 L E
4594	88	Q6
4595	88	SQ6
4596	88	RS 6 AVANT
4597	88	S E-TRON GT
4598	89	BROOKLANDS
4599	89	AZURE
4600	89	TURBO
4601	89	MULSANNE
4602	89	FLYING SPUR
4603	89	EIGHT
4604	89	ARNAGE
4605	89	ARMOURED ARNAGE
4606	89	ROLL ROYCE SILVER SERAPH
4607	89	ROLLS-ROYCE PARK WARD
4608	89	BENTAYGA
4609	89	CONTINENTAL
4610	90	911
4611	90	BOXSTER
4612	90	CAYENNE
4613	90	CAYMAN
4614	90	PANAMERA
4615	90	918
4616	90	MACAN
4617	90	944
4618	90	928
4619	90	924
4620	90	968
4621	90	TAYCAN
4622	90	718 BOXSTER
4623	90	718 SPYDER
4624	90	718 CAYMAN
4625	91	612 SCAGLIETTI
4626	91	599
4627	91	599 GTB FIORANO
4628	91	430
4629	91	F430
4630	91	360
4631	91	575M MARANELLO
4632	91	456M
4633	91	ENZO
4634	91	F355
4635	91	550 MARANELLO
4636	91	F12 BERLINETTA
4637	91	CALIFORNIA T
4638	91	FF
4639	91	LA FERRARI
4640	91	458 ITALIA
4641	91	458
4642	91	CALIFORNIA
4643	91	348 TB
4644	91	348 TS
4645	91	512 TR
4646	91	355 BERLINETTA
4647	91	355 GTS
4648	91	348 SPIDER
4649	91	456
4650	91	355 SPIDER
4651	91	MONDIAL T
4652	91	TESTAROSSA
4653	91	F40
4654	91	328 GTB
4655	91	328 GTS
4656	91	3.2 MONDIAL
4657	91	328
4658	91	308GTB QUATTROVALVOLE
4659	91	308GTS QUATTROVALVOLE
4660	91	MONDIAL 8
4661	91	308 CONVERTIBLE
4662	91	F12 SPECIAL SERIES
4663	91	F60 AMERICA
4664	91	308GTBI
4665	91	308GTSI
4666	91	308GTB
4667	91	308GTS
4668	91	F12 TDF (TOUR DE FRANCE)
4669	91	GTC4LUSSO
4670	91	488
4671	91	PORTOFINO
4672	91	812
4673	91	F8
4674	91	ROMA
4675	91	CHALLENGE STRADALE
4676	91	PORTOFINO M
4677	91	SF90
4678	91	550 BARCHETTA
4679	91	F50
4680	91	PUROSANGUE
4681	91	MONZA SP1/SP2
4682	91	DAYTONA SP3
4683	91	296
4684	91	12CILINDRI
4685	92	MV-1
4686	93	CREATIVE COACHWORKS
4687	94	EBOX
4688	94	TZERO
4689	95	CHARADE
4690	95	ROCKY
4691	95	LOW SPEED VEHICLE
4692	96	F-7
4693	97	2 DOOR WAVE
4694	97	4 DOOR WAVE
4695	97	2 DOOR INIZIO SPORTS CAR
4696	97	2 DOOR WAVE TRUCK
4697	97	4 DOOR WAVE TRUCK
4698	97	MOTORCYCLE WAVE
4699	97	CUSTOM VEHICLE
4700	97	CHOPPER
4701	97	LIV WISE
4702	98	FAW JIANXING HAPPY MESSENGER
4703	99	ASTRA
4704	99	SKY
4705	99	AURA
4706	99	VUE
4707	99	OUTLOOK
4708	99	ION
4709	99	RELAY
4710	99	L300
4711	99	L200
4712	99	SL
4713	99	SL1
4714	99	SL2
4715	99	SC1
4716	99	SC2
4717	99	LS
4718	99	SW1
4719	99	SW2
4720	99	LS1
4721	99	LS2
4722	99	LW2
4723	99	LW1
4724	99	LW200
4725	99	LW300
4726	99	SL3
4727	100	LANOS
4728	100	NUBIRA
4729	100	LEGANZA
4730	100	LAGANZA V-CAR
4731	100	LEGANZA V-200 & VARIANTS/DERIVATIVES
4732	100	G2X
4733	101	EAGLE
4734	101	EAGLE SX/4
4735	101	CONCORD
4736	101	SPIRIT
4737	102	F1S
4738	102	FXS
4739	103	METRO
4740	103	STORM
4741	103	PRIZM
4742	103	TRACKER
4743	103	SPRINT
4744	103	SPECTRUM
4745	104	RT.C
4746	104	RK.S
4747	104	RT.S
4748	104	RT.V
4749	104	RT.X
4750	105	TROPHY EDITION
4751	105	SPORT EDITION
4752	105	PERFORMANCE EDITION
4753	105	RACE EDITION
4754	105	EURO EDITION
4755	105	GT MALAN
4756	106	EQUUS PASSENGER CAR
4757	107	ELECTRIC MOBILE CARS
4758	108	OPEN TOP
4759	108	CROSSOVER
4760	108	COUPE
4761	108	ROADSTER
4762	109	BAKKURA MOBILITY
4763	110	NEIGHBOR
4764	110	CITY
4765	111	CODA
4766	112	RAVENHAWK
4767	113	KOENIGSEGG AUTOMOTIVE
4768	113	ONE:1
4769	113	AGERA
4770	113	REGERA
4771	113	JESKO
4772	113	CC850
4773	114	E6
4774	114	EBUS
4775	114	ELECTRIC BUS
4776	114	ELECTRIC TRUCK
4777	114	ELECTRIC TRUCK CHASSIS
4778	114	FUEL CELL TRUCK
4779	114	FUEL CELL TRUCK CHASSIS
4780	114	ELECTRIC BUS CHASSIS
4781	114	FUEL CELL BUS
4782	114	FUEL CELL BUS CHASSIS
4783	114	ELECTRIC TRUCK TRACTOR
4784	114	FUEL CELL TRUCK TRACTOR
4785	114	K7M
4786	114	K7MER
4787	114	K8M
4788	114	K9M
4789	114	K9MD
4790	114	K11M
4791	114	C8M
4792	114	C8MS
4793	114	C10M
4794	114	C10MS
4795	114	TYPE-A ELECTRIC SCHOOL BUS
4796	114	TYPE-C ELECTRIC SCHOOL BUS
4797	114	TYPE-D ELECTRIC SCHOOL BUS
4798	114	6F/6R
4799	114	8TT
4800	114	8Y
4801	114	ACHIEVER
4802	114	CREATOR
4803	114	DREAMER
4804	114	8R
4805	115	K10 ROADSTER
4806	115	K11 PANDA
4807	115	K12 CITY BEAUTY
4808	115	K13 URBAN COWBOY
4809	115	K17A
4810	115	K28
4811	115	K23-300
4812	115	K27-300
4813	115	K28-300
4814	115	K30
4815	115	K22
4816	115	SINGLE-ROW PASSENGER CAB
4817	115	DOUBLE-ROW PASSENGER CAB
4818	115	KD08
4819	115	CLOSED BODY
4820	115	CONVERTIBLE VEHICLES
4821	115	KANDI
4822	116	MOTION
4823	117	MIZER G4
4824	118	MP4-12C
4825	118	P1
4826	118	625C
4827	118	650S
4828	118	675LT
4829	118	540C
4830	118	570S
4831	118	570GT
4832	118	600LT
4833	118	720S
4834	118	SENNA
4835	118	SENNA GTR
4836	118	GT
4837	118	620R
4838	118	765LT
4839	118	ELVA
4840	118	ARTURA
4841	118	750S
4842	118	GTS
4843	119	CV .2
4844	120	SUMMIT
4845	120	TALON
4846	120	VISION
4847	120	2000 GTX
4848	120	PREMIER
4849	120	VISTA
4850	120	MEDALLION
4851	121	NEON
4852	121	BREEZE
4853	121	PROWLER
4854	121	ACCLAIM
4855	121	COLT
4856	121	SUNDANCE
4857	121	LASER
4858	121	HORIZON
4859	121	TURISMO
4860	121	RELIANT
4861	121	CARAVELLE
4862	121	GRAN FURY
4863	121	CONQUEST
4864	121	SAPPORO
4865	121	CHAMP
4866	121	VOYAGER
4867	121	GRAND VOYAGER
4868	121	SCAMP
4869	121	ARROW
4870	121	TRAILDUSTER
4871	122	R32
4872	123	PHOENIX MOTORCARS
4873	124	ROADSTER ZR
4874	124	GTM COUPE
4875	125	SZR
4876	126	WILLYS PICKUP
4877	126	WILLYS COUPE
4878	127	UKEYCHEYMA
4879	127	UKEYMAWA
4880	127	KODA
4881	127	CITYO
4882	127	MOWA
4883	127	GAMBLER
4884	127	NEPTUNE
4885	127	ONO
4886	127	MONOM
4887	127	JOPI
4888	127	U-1500 SINGLE REAR WHEELS
4889	127	U-2500 SINGLE REAR WHEELS
4890	127	U-3500 SINGLE REAR WHEELS
4891	127	U-4500 SINGLE REAR WHEELS
4892	127	U-3500 DUAL REAR WHEELS
4893	127	U-4500 DUAL REAR WHEELS
4894	127	JUPITER
4895	128	ELECTRIC STINGER
4896	128	TRILECTRA XR
4897	129	C8
4898	129	C12
4899	129	D8/D12
4900	130	BRAVADA
4901	130	SILHOUETTE
4902	130	ALERO
4903	130	AURORA
4904	130	INTRIGUE
4905	130	REGENCY
4906	130	EIGHTY EIGHT (88)
4907	130	LSS
4908	130	CUTLASS
4909	130	ACHIEVA
4910	130	CUTLASS SUPREME
4911	130	NINETY EIGHT (98)
4912	130	CUSTOM CRUISER
4913	130	TORONADO
4914	130	CUTLASS CALAIS
4915	130	FIRENZA
4916	130	OMEGA
4917	130	CUTLASS CIERA
4918	130	DELTA 88
4919	130	CUTLASS CRUISER
4920	130	CUTLASS SALON
4921	131	PANOZ ROADSTER
4922	132	S7
4923	133	SUNRISE
4924	133	FORCE
4925	133	FLASH
4926	133	CITIVAN
4927	134	VICKY
4928	134	COBRA
4929	134	WILLYS
4930	134	CABRIOLET
4931	134	COUPE
4932	134	DELIVERY
4933	134	CLUB PICKUP
4934	134	BUCKET
4935	135	BLADE
4936	136	COBRA 427 REPLICA
4937	136	DAYTONA COUPE REPLICA
4938	136	GT40 REPLICA
4939	136	1932 FORD HIGHBOY REPLICA
4940	136	1934 FORD ROADSTER
4941	136	1934 FORD 5-WINDOW COUPE REPLICA
4942	137	BLUECAR, SAS
4943	138	MT900S
4944	138	RAPTOR
4945	139	HUAYRA
4946	139	UTOPIA
4947	140	M6466
4948	141	LIMO BUS
4949	141	LIMO
4950	142	SPORTS CAR
4951	142	RACING CAR
4952	143	G80
4953	143	G90
4954	143	G70
4955	143	GV80
4956	143	GV70
4957	143	GV60
4958	143	GV60 MAGMA
4959	144	KARMA
4960	144	ATLANTIC
4961	144	REVERO
4962	144	REVERO GT
4963	144	GS-6
4964	144	KAVEYA
4965	144	GYESERA
4966	145	MATRIX MOTOR COMPANY
4967	146	CADILLAC FUNERAL CAR
4968	146	CADILLAC FIRST CALL
4969	146	CADILLAC LIMOUSINE
4970	146	CADILLAC SKI CRUISER
4971	146	BUICK FUNERAL CAR
4972	146	BUICK FIRST CALL
4973	146	BUICK LIMOUSINE
4974	146	BUICK SKI CRUISER
4975	146	MERCEDES LIMOUSINE
4976	146	MERCEDES SKI CRUISER
4977	146	MERCEDES FUNERAL CAR
4978	146	MERCEDES FIRST CALL
4979	146	LINCOLN SKI CRUISER
4980	146	LINCOLN FUNERAL CAR
4981	146	LINCOLN FIRST CALL
4982	146	LINCOLN LIMOUSINE
4983	147	IMPERO
4984	148	SUNFIRE
4985	149	XR4TI
4986	149	SCORPIO
4987	150	AVANTI
4988	151	YUGO 45
4989	151	YUGO 65
4990	151	YUGO 55
4991	151	102, GV
4992	152	505
4993	152	405
4994	152	604
4995	152	504
4996	153	827
4997	153	825
4998	154	GTP
4999	155	210
5000	155	310
5001	155	510
5002	155	280ZX
5003	156	AZZURRA
5004	157	XK120
5005	157	SS100
5006	158	LONDON TAXI
5007	159	MIAMI
5008	160	KALLISTA
5009	161	DAYTONA MIDGIE-2
5010	162	427
5011	162	32
5012	162	53
5013	163	SPORT SPIDER
5014	163	E
5015	164	GRUPPE B
5016	165	RS COSWORTH
5017	165	RS 200
5018	166	TROPICA
5019	167	COBRA
5020	168	HUNTER DESIGN GROUP, LLC
5021	169	MALIBU
5022	169	CORDOVA
5023	169	CLASSIC
5024	170	GULLWING 300SL(MERCEDES REPLICA)
5025	170	ROADSTER 300SL(MERCEDES REPLICA)
5026	171	F1
5027	172	MALIBU SEDAN
5028	172	CORDOVA SEDAN
5029	172	CLASSIC SEDAN
5030	173	DUCHESS
5031	173	DUKE
5032	173	MARLENE
5033	173	SAXON
5034	173	SEBRING
5035	173	MX
5036	173	COBRA
5037	174	MUSTANG
5038	174	CAMARO
5039	174	CHEVELLE
5040	174	500K
5041	175	OTHERS
5042	175	COBRA DAYTONA
5043	176	CHEETAH
5044	176	SUPER CHEETAH
5045	177	GLS
5046	177	HSE
5047	177	GLD
5048	177	AMG
5049	177	LSX
5050	178	BUG
5051	179	EXCALIBUR AUTOMOBILE CORPORATION TRAILER
5052	179	SEDAN
5053	179	PHAETON
5054	179	ROADSTER
5055	179	LIMOUSINE
5056	180	THE HUNTER/EL CAZADOR
5057	180	CALYPSO
5058	180	M151
5059	180	M2000
5060	180	SUPER HUNTER
5061	181	AUTODELTA USA INC
5062	182	AUTOCAR LTD
5063	183	MOKE
5064	183	GEN 1 EV
5065	184	BBC PASSENGER CAR
5066	184	BBC MOTORCYCLE
5067	185	PHOENIX SPORTS CARS, INC.
5068	186	VECTOR
5069	187	LONDON TAXI
5070	188	BARON AUTOMOBILE LINE
5071	189	GT MODEL
5072	190	CHRYSLER BASE
5073	190	FORD BASE
5074	190	GENERAL MOTORS BASE
5075	191	MI-6
5076	192	CX AUTOMOTIVE
5077	193	LA EXOTICS
5078	194	XC-53
5079	194	MIGI
5080	194	OTHER
5081	195	SF5
5082	196	003S
5083	196	003CS
5084	196	003C
5085	196	004S
5086	196	004CS
5087	196	004C
5088	196	005S
5089	196	005CS
5090	196	005C
5091	196	006S
5092	196	006CS
5093	196	006C
5094	196	007CS
5095	196	008S
5096	196	002S
5097	196	002CS
5098	197	LC79-R
5099	197	LC78-R
5100	197	LC40-R
5101	197	LC44-R
5102	197	LC45-R
5103	197	LC47-R
5104	198	KOMBI TRANSPORTER T2-R
5105	198	KOMBI CAMPER T2-R
5106	199	LRD110-R
5107	199	LRD90-R
5108	200	LITE CAR
5109	201	PS1
5110	201	PS2
5111	201	POLESTAR 3
5112	201	POLESTAR 4
5113	201	POLESTAR 5
5114	202	21C
5115	203	4-DOOR BOOT BAJA EDITION
5116	203	4-DOOR BOOT
5117	203	2-DOOR BOOT
5118	203	2-DOOR BOOT BAJA EDITION
5119	203	004
5120	203	007
5121	204	SPORT 
5122	204	REAR DRIVE MOTOR
5123	204	FRONT DRIVE MOTOR
5124	205	CRUISE AV
5125	206	AIR
5126	206	GRAVITY
5127	207	CA1
5128	208	BATTISTA
5129	209	J2X
5130	210	COBRA
5131	210	GT
5132	211	KARMA
5133	211	OCEAN
5134	211	NINA
5135	212	NEVERA
5136	212	NEVERA R
5137	213	ZOOX
5138	214	X
5139	214	X2
5140	215	B2
5141	216	SCR / R SPYDER / SPEEDSTER
5142	216	CTR1
5143	216	CTR ANNIVERSARY / CTR2 / TURBO R / BTR / RCT
5144	216	CTR3 / RTR / RT12
5145	217	CF1
5146	218	TUATARA
5147	218	STRIKER
5148	218	AGGRESSOR
5149	219	FR1
5150	219	FR2
5151	220	MANX 2.0
5152	220	RESORTER
5153	220	MEYERS MANX
5154	221	1955 CUSTOM BELAIR
5155	222	ORIGINAL
5156	223	RX5
5157	223	SPORT
5158	224	MODEL A
5159	224	THUNDERBIRD
5160	225	DMC-12
5161	226	ASHER SERIES
5162	227	A-11
5163	227	A-12
5164	228	X 1/9
5165	229	MODEL A
5166	230	RT
5167	231	ROADSTER
5168	232	MODEL 1
5169	232	MODEL 3
5170	232	MODEL 6
5171	232	MODEL 9
5172	233	ROGUE
5173	233	WRAITH
5174	233	PROWLER
5175	233	PHANTOM
5176	233	CHAOS
5177	233	FURY
5178	233	LYNX
5179	233	BULLET
5180	233	COMET
5181	233	PEGASUS
5182	233	STALLION
5183	233	ALTER-C
5184	233	ALTER-S
5185	234	LECAR
5186	234	18I
5187	234	FUEGO
5188	234	ALLIANCE
5189	234	ENCORE
5190	235	BENTLEY BLOWER JNR
\.


--
-- TOC entry 5273 (class 0 OID 18307)
-- Dependencies: 261
-- Data for Name: modelos_has_anio; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.modelos_has_anio (idmodelos, idanio) FROM stdin;
\.


--
-- TOC entry 5239 (class 0 OID 16596)
-- Dependencies: 227
-- Data for Name: modelos_has_motores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modelos_has_motores (idmodelos, idmotores) FROM stdin;
\.


--
-- TOC entry 5238 (class 0 OID 16589)
-- Dependencies: 226
-- Data for Name: motores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.motores (idmotores, tipo_motor) FROM stdin;
1	4.0
2	1.0
3	1.0L L3
4	1.2L L3
5	1.4L L4
6	1.6L L4
7	1.8L L4
8	2.0L L4
9	2.4L L4
10	2.5L L4
11	3.0L V6
12	3.5L V6
13	4.0L V6
14	5.0L V8
15	5.7L V8
16	Eléctrico
17	Híbrido
\.


--
-- TOC entry 5245 (class 0 OID 16657)
-- Dependencies: 233
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (idproductos, nombre, precio_unitario, precio_venta, stock_minimo, categoria, sku, ubicacion_almacen, stock_actual, marca) FROM stdin;
4	Aceite 15w40	220	220	10	Aceite	jjzjhagkj	aaa	0	\N
1	filtro aceite ph6607	235	235	34	afinacion	asf	sfsdf	-6	\N
2	Aceite 15w40	250	250	10	Filtros 	afasfa	estante 5	-50	\N
3	filtro aceite ph9980	300	300	3	Filtros	AD34-32	A-5	14	\N
\.


--
-- TOC entry 5270 (class 0 OID 17302)
-- Dependencies: 258
-- Data for Name: productos_compatibilidad; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.productos_compatibilidad (id, idproductos, idmarcas, idmodelos, cantidad, precio_especial) FROM stdin;
\.


--
-- TOC entry 5248 (class 0 OID 16674)
-- Dependencies: 236
-- Data for Name: productos_has_servicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos_has_servicios (idproductos, idservicios, cantidad) FROM stdin;
2	2	5
2	1	5
1	1	1
3	1	1
\.


--
-- TOC entry 5250 (class 0 OID 16692)
-- Dependencies: 238
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedor (idproveedor, nombre) FROM stdin;
1	Auto Partes SA
2	Distribuidora ABC
3	Refacciones XYZ
\.


--
-- TOC entry 5275 (class 0 OID 26413)
-- Dependencies: 263
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: user1_abd
--

COPY public.roles (idroles, nombre, descripcion, permisos) FROM stdin;
1	Administrador	Acceso completo al sistema	["Dashboard","Citas","Vehículos","Servicios","Productos","Ventas","Compras","Cotizaciones","Reportes","Usuarios","Roles"]
2	Técnico	Acceso a servicios y mantenimiento	["Citas","Vehículos","Servicios"]
3	Cliente	Acceso al portal de clientes	["Cotizaciones","Reportes"]
\.


--
-- TOC entry 5247 (class 0 OID 16665)
-- Dependencies: 235
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicios (idservicios, nombre, descripcion, tiempo_estimado, costo, categoria, mano_obra, refacciones_estimadas) FROM stdin;
2	cambio aceite		6	1500	afinacion	600	900
1	afinacion integral		3	2285	afinacion	500	1785
\.


--
-- TOC entry 5232 (class 0 OID 16555)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (idusuarios, idroles, email, contrasena, nombre, telefono) FROM stdin;
4	3	ian@hotm.com	$2a$10$15jXGKTu7KJCA9NCNRKYXOn4Ujwm.FU4WUhViefJIyA88kOvyteQe	iangoncen	1234567890
3	2	ian@hot.com	$2a$10$ltr779cfZ5EkWQ1JseCEoeRCF9xQjZmpv1m/xMKUVFcxq5MNtIf6S	ian goncen	1234567894
6	3	laura@hotm.com	$2a$10$Yja82PtpnykdnklJRgUfdudyeKon2Y3BtwqVc5McS0/gn9dXdTCim	Laura Garcia	8444923686
8	3	algo2@algo.com	$2a$10$1MHTOPEEAnDUN4xRcbADHObwLleh5ziOBLJ4UtyNh.fiQ.wwDUuEy	hito 3	1234567899
13	3	nelson@hotma.com	$2a$10$rWWKhO7oSY1FEzmn8wopiOu8Pur4RL/FAPyzIDK8EGZMqWI.36xyK	nelson	1234567900
14	1	rogelio@hotmail.com	$2a$10$QUybpzcOVnPruMYnZLBCteFCMrvlXL2iFt.ekaE0jw.Un.aH3WanC	Rogelio Garcia	8442555432
15	1	admin@admin.com	$2a$10$7g9aRwd7CqOgQ/pFfXQY3.PSn6egLavQU0kgpyUAHsHElrlOVjbIe	Administrador	
\.


--
-- TOC entry 5243 (class 0 OID 16622)
-- Dependencies: 231
-- Data for Name: vehiculos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehiculos (idvehiculos, idusuarios, idanio, idmarcas, idmotores, idmodelos, placa, color, km, vin) FROM stdin;
\.


--
-- TOC entry 5256 (class 0 OID 16748)
-- Dependencies: 244
-- Data for Name: venta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.venta (idventa, idproductos, idusuarios, metodo_pago, total, fecha) FROM stdin;
1	1	4	2	235	2026-05-04 08:02:14.551309
2	1	6	2	235	2026-05-04 23:02:30.657873
3	\N	8	2	235	2026-05-05 09:03:34.861036
4	\N	3	2	940	2026-05-05 13:33:22.199095
5	\N	4	2	250	2026-05-05 14:33:54.875208
6	\N	3	2	770	2026-05-05 23:00:54.128038
\.


--
-- TOC entry 5302 (class 0 OID 0)
-- Dependencies: 228
-- Name: anio_idanio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anio_idanio_seq', 37, true);


--
-- TOC entry 5303 (class 0 OID 0)
-- Dependencies: 247
-- Name: cita_idcita_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cita_idcita_seq', 19, true);


--
-- TOC entry 5304 (class 0 OID 0)
-- Dependencies: 239
-- Name: compra_numero_orden_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compra_numero_orden_seq', 5, true);


--
-- TOC entry 5305 (class 0 OID 0)
-- Dependencies: 241
-- Name: cotizacion_idcotizacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cotizacion_idcotizacion_seq', 23, true);


--
-- TOC entry 5306 (class 0 OID 0)
-- Dependencies: 249
-- Name: detallecompra_iddetalle_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.detallecompra_iddetalle_seq', 7, true);


--
-- TOC entry 5307 (class 0 OID 0)
-- Dependencies: 253
-- Name: detallemantenimientoproductos_iddetalle_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.detallemantenimientoproductos_iddetalle_seq', 30, true);


--
-- TOC entry 5308 (class 0 OID 0)
-- Dependencies: 251
-- Name: detallemantenimientoservicios_iddetalle_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.detallemantenimientoservicios_iddetalle_seq', 17, true);


--
-- TOC entry 5309 (class 0 OID 0)
-- Dependencies: 259
-- Name: detalleventa_iddetalleventa_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.detalleventa_iddetalleventa_seq', 5, true);


--
-- TOC entry 5310 (class 0 OID 0)
-- Dependencies: 245
-- Name: factura_idfactura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_idfactura_seq', 1, false);


--
-- TOC entry 5311 (class 0 OID 0)
-- Dependencies: 255
-- Name: mantenimiento_idmantenimiento_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.mantenimiento_idmantenimiento_seq', 16, true);


--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 221
-- Name: marca_idmarcas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marca_idmarcas_seq', 235, true);


--
-- TOC entry 5313 (class 0 OID 0)
-- Dependencies: 223
-- Name: modelos_idmodelos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modelos_idmodelos_seq', 5190, true);


--
-- TOC entry 5314 (class 0 OID 0)
-- Dependencies: 225
-- Name: motores_idmotores_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.motores_idmotores_seq', 17, true);


--
-- TOC entry 5315 (class 0 OID 0)
-- Dependencies: 257
-- Name: productos_compatibilidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.productos_compatibilidad_id_seq', 7, true);


--
-- TOC entry 5316 (class 0 OID 0)
-- Dependencies: 232
-- Name: productos_idproductos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_idproductos_seq', 6, true);


--
-- TOC entry 5317 (class 0 OID 0)
-- Dependencies: 237
-- Name: proveedor_idproveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedor_idproveedor_seq', 3, true);


--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 262
-- Name: roles_idroles_seq; Type: SEQUENCE SET; Schema: public; Owner: user1_abd
--

SELECT pg_catalog.setval('public.roles_idroles_seq', 3, true);


--
-- TOC entry 5319 (class 0 OID 0)
-- Dependencies: 234
-- Name: servicios_idservicios_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicios_idservicios_seq', 2, true);


--
-- TOC entry 5320 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_idusuarios_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_idusuarios_seq', 15, true);


--
-- TOC entry 5321 (class 0 OID 0)
-- Dependencies: 230
-- Name: vehiculos_idvehiculos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehiculos_idvehiculos_seq', 11, true);


--
-- TOC entry 5322 (class 0 OID 0)
-- Dependencies: 243
-- Name: venta_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.venta_idventa_seq', 6, true);


--
-- TOC entry 5009 (class 2606 OID 16620)
-- Name: anio anio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anio
    ADD CONSTRAINT anio_pkey PRIMARY KEY (idanio);


--
-- TOC entry 5031 (class 2606 OID 16812)
-- Name: cita cita_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (idcita);


--
-- TOC entry 5023 (class 2606 OID 16706)
-- Name: compra compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (numero_orden);


--
-- TOC entry 5025 (class 2606 OID 16726)
-- Name: cotizacion cotizacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizacion
    ADD CONSTRAINT cotizacion_pkey PRIMARY KEY (idcotizacion);


--
-- TOC entry 5033 (class 2606 OID 16912)
-- Name: detallecompra detallecompra_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_pkey PRIMARY KEY (iddetalle);


--
-- TOC entry 5037 (class 2606 OID 17015)
-- Name: detallemantenimientoproductos detallemantenimientoproductos_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallemantenimientoproductos
    ADD CONSTRAINT detallemantenimientoproductos_pkey PRIMARY KEY (iddetalle);


--
-- TOC entry 5035 (class 2606 OID 16995)
-- Name: detallemantenimientoservicios detallemantenimientoservicios_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallemantenimientoservicios
    ADD CONSTRAINT detallemantenimientoservicios_pkey PRIMARY KEY (iddetalle);


--
-- TOC entry 5045 (class 2606 OID 17536)
-- Name: detalleventa detalleventa_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detalleventa
    ADD CONSTRAINT detalleventa_pkey PRIMARY KEY (iddetalleventa);


--
-- TOC entry 5029 (class 2606 OID 16774)
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (idfactura);


--
-- TOC entry 5039 (class 2606 OID 17039)
-- Name: mantenimiento mantenimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.mantenimiento
    ADD CONSTRAINT mantenimiento_pkey PRIMARY KEY (idmantenimiento);


--
-- TOC entry 5001 (class 2606 OID 16574)
-- Name: marca marca_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (idmarcas);


--
-- TOC entry 5007 (class 2606 OID 16602)
-- Name: modelos_has_motores modelos_has_motores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos_has_motores
    ADD CONSTRAINT modelos_has_motores_pkey PRIMARY KEY (idmodelos, idmotores);


--
-- TOC entry 5003 (class 2606 OID 16582)
-- Name: modelos modelos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos
    ADD CONSTRAINT modelos_pkey PRIMARY KEY (idmodelos);


--
-- TOC entry 5005 (class 2606 OID 16595)
-- Name: motores motores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.motores
    ADD CONSTRAINT motores_pkey PRIMARY KEY (idmotores);


--
-- TOC entry 5047 (class 2606 OID 18313)
-- Name: modelos_has_anio pk_modelos_has_anio; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.modelos_has_anio
    ADD CONSTRAINT pk_modelos_has_anio PRIMARY KEY (idmodelos, idanio);


--
-- TOC entry 5043 (class 2606 OID 17312)
-- Name: productos_compatibilidad productos_compatibilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.productos_compatibilidad
    ADD CONSTRAINT productos_compatibilidad_pkey PRIMARY KEY (id);


--
-- TOC entry 5019 (class 2606 OID 16680)
-- Name: productos_has_servicios productos_has_servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_has_servicios
    ADD CONSTRAINT productos_has_servicios_pkey PRIMARY KEY (idproductos, idservicios);


--
-- TOC entry 5013 (class 2606 OID 16663)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (idproductos);


--
-- TOC entry 5015 (class 2606 OID 17806)
-- Name: productos productos_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_sku_key UNIQUE (sku);


--
-- TOC entry 5021 (class 2606 OID 16698)
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (idproveedor);


--
-- TOC entry 5049 (class 2606 OID 26423)
-- Name: roles roles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_key UNIQUE (nombre);


--
-- TOC entry 5051 (class 2606 OID 26421)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (idroles);


--
-- TOC entry 5017 (class 2606 OID 16673)
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (idservicios);


--
-- TOC entry 4999 (class 2606 OID 16561)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (idusuarios);


--
-- TOC entry 5011 (class 2606 OID 16630)
-- Name: vehiculos vehiculos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (idvehiculos);


--
-- TOC entry 5027 (class 2606 OID 16754)
-- Name: venta venta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (idventa);


--
-- TOC entry 5040 (class 1259 OID 17329)
-- Name: idx_compatibilidad_marcas; Type: INDEX; Schema: public; Owner: user1_abd
--

CREATE INDEX idx_compatibilidad_marcas ON public.productos_compatibilidad USING btree (idmarcas);


--
-- TOC entry 5041 (class 1259 OID 17328)
-- Name: idx_compatibilidad_modelos; Type: INDEX; Schema: public; Owner: user1_abd
--

CREATE INDEX idx_compatibilidad_modelos ON public.productos_compatibilidad USING btree (idmodelos);


--
-- TOC entry 5070 (class 2606 OID 16813)
-- Name: cita cita_idcotizacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_idcotizacion_fkey FOREIGN KEY (idcotizacion) REFERENCES public.cotizacion(idcotizacion);


--
-- TOC entry 5071 (class 2606 OID 16818)
-- Name: cita cita_idusuarios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_idusuarios_fkey FOREIGN KEY (idusuarios) REFERENCES public.usuarios(idusuarios);


--
-- TOC entry 5062 (class 2606 OID 16707)
-- Name: compra compra_idproveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_idproveedor_fkey FOREIGN KEY (idproveedor) REFERENCES public.proveedor(idproveedor);


--
-- TOC entry 5063 (class 2606 OID 16742)
-- Name: cotizacion cotizacion_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizacion
    ADD CONSTRAINT cotizacion_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos);


--
-- TOC entry 5064 (class 2606 OID 16737)
-- Name: cotizacion cotizacion_idservicios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizacion
    ADD CONSTRAINT cotizacion_idservicios_fkey FOREIGN KEY (idservicios) REFERENCES public.servicios(idservicios);


--
-- TOC entry 5065 (class 2606 OID 16727)
-- Name: cotizacion cotizacion_idusuarios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizacion
    ADD CONSTRAINT cotizacion_idusuarios_fkey FOREIGN KEY (idusuarios) REFERENCES public.usuarios(idusuarios);


--
-- TOC entry 5066 (class 2606 OID 16732)
-- Name: cotizacion cotizacion_idvehiculos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cotizacion
    ADD CONSTRAINT cotizacion_idvehiculos_fkey FOREIGN KEY (idvehiculos) REFERENCES public.vehiculos(idvehiculos);


--
-- TOC entry 5072 (class 2606 OID 16918)
-- Name: detallecompra detallecompra_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos);


--
-- TOC entry 5073 (class 2606 OID 16913)
-- Name: detallecompra detallecompra_numero_orden_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_numero_orden_fkey FOREIGN KEY (numero_orden) REFERENCES public.compra(numero_orden) ON DELETE CASCADE;


--
-- TOC entry 5075 (class 2606 OID 17021)
-- Name: detallemantenimientoproductos detallemantenimientoproductos_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallemantenimientoproductos
    ADD CONSTRAINT detallemantenimientoproductos_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos);


--
-- TOC entry 5074 (class 2606 OID 17001)
-- Name: detallemantenimientoservicios detallemantenimientoservicios_idservicios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detallemantenimientoservicios
    ADD CONSTRAINT detallemantenimientoservicios_idservicios_fkey FOREIGN KEY (idservicios) REFERENCES public.servicios(idservicios);


--
-- TOC entry 5080 (class 2606 OID 17542)
-- Name: detalleventa detalleventa_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detalleventa
    ADD CONSTRAINT detalleventa_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos);


--
-- TOC entry 5081 (class 2606 OID 17537)
-- Name: detalleventa detalleventa_idventa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.detalleventa
    ADD CONSTRAINT detalleventa_idventa_fkey FOREIGN KEY (idventa) REFERENCES public.venta(idventa) ON DELETE CASCADE;


--
-- TOC entry 5069 (class 2606 OID 16775)
-- Name: factura factura_idventa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_idventa_fkey FOREIGN KEY (idventa) REFERENCES public.venta(idventa);


--
-- TOC entry 5082 (class 2606 OID 18319)
-- Name: modelos_has_anio fk_mha_anio; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.modelos_has_anio
    ADD CONSTRAINT fk_mha_anio FOREIGN KEY (idanio) REFERENCES public.anio(idanio) ON DELETE CASCADE;


--
-- TOC entry 5083 (class 2606 OID 18314)
-- Name: modelos_has_anio fk_mha_modelos; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.modelos_has_anio
    ADD CONSTRAINT fk_mha_modelos FOREIGN KEY (idmodelos) REFERENCES public.modelos(idmodelos) ON DELETE CASCADE;


--
-- TOC entry 5076 (class 2606 OID 17040)
-- Name: mantenimiento mantenimiento_idvehiculos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.mantenimiento
    ADD CONSTRAINT mantenimiento_idvehiculos_fkey FOREIGN KEY (idvehiculos) REFERENCES public.vehiculos(idvehiculos);


--
-- TOC entry 5053 (class 2606 OID 16603)
-- Name: modelos_has_motores modelos_has_motores_idmodelos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos_has_motores
    ADD CONSTRAINT modelos_has_motores_idmodelos_fkey FOREIGN KEY (idmodelos) REFERENCES public.modelos(idmodelos);


--
-- TOC entry 5054 (class 2606 OID 16608)
-- Name: modelos_has_motores modelos_has_motores_idmotores_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos_has_motores
    ADD CONSTRAINT modelos_has_motores_idmotores_fkey FOREIGN KEY (idmotores) REFERENCES public.motores(idmotores);


--
-- TOC entry 5052 (class 2606 OID 16583)
-- Name: modelos modelos_idmarcas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos
    ADD CONSTRAINT modelos_idmarcas_fkey FOREIGN KEY (idmarcas) REFERENCES public.marca(idmarcas);


--
-- TOC entry 5077 (class 2606 OID 17318)
-- Name: productos_compatibilidad productos_compatibilidad_idmarcas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.productos_compatibilidad
    ADD CONSTRAINT productos_compatibilidad_idmarcas_fkey FOREIGN KEY (idmarcas) REFERENCES public.marca(idmarcas) ON DELETE CASCADE;


--
-- TOC entry 5078 (class 2606 OID 17323)
-- Name: productos_compatibilidad productos_compatibilidad_idmodelos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.productos_compatibilidad
    ADD CONSTRAINT productos_compatibilidad_idmodelos_fkey FOREIGN KEY (idmodelos) REFERENCES public.modelos(idmodelos) ON DELETE CASCADE;


--
-- TOC entry 5079 (class 2606 OID 17313)
-- Name: productos_compatibilidad productos_compatibilidad_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user1_abd
--

ALTER TABLE ONLY public.productos_compatibilidad
    ADD CONSTRAINT productos_compatibilidad_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos) ON DELETE CASCADE;


--
-- TOC entry 5060 (class 2606 OID 16681)
-- Name: productos_has_servicios productos_has_servicios_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_has_servicios
    ADD CONSTRAINT productos_has_servicios_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos);


--
-- TOC entry 5061 (class 2606 OID 16686)
-- Name: productos_has_servicios productos_has_servicios_idservicios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_has_servicios
    ADD CONSTRAINT productos_has_servicios_idservicios_fkey FOREIGN KEY (idservicios) REFERENCES public.servicios(idservicios);


--
-- TOC entry 5055 (class 2606 OID 16636)
-- Name: vehiculos vehiculos_idanio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_idanio_fkey FOREIGN KEY (idanio) REFERENCES public.anio(idanio);


--
-- TOC entry 5056 (class 2606 OID 16641)
-- Name: vehiculos vehiculos_idmarcas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_idmarcas_fkey FOREIGN KEY (idmarcas) REFERENCES public.marca(idmarcas);


--
-- TOC entry 5057 (class 2606 OID 16651)
-- Name: vehiculos vehiculos_idmodelos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_idmodelos_fkey FOREIGN KEY (idmodelos) REFERENCES public.modelos(idmodelos);


--
-- TOC entry 5058 (class 2606 OID 16646)
-- Name: vehiculos vehiculos_idmotores_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_idmotores_fkey FOREIGN KEY (idmotores) REFERENCES public.motores(idmotores);


--
-- TOC entry 5059 (class 2606 OID 16631)
-- Name: vehiculos vehiculos_idusuarios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_idusuarios_fkey FOREIGN KEY (idusuarios) REFERENCES public.usuarios(idusuarios);


--
-- TOC entry 5067 (class 2606 OID 16755)
-- Name: venta venta_idproductos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_idproductos_fkey FOREIGN KEY (idproductos) REFERENCES public.productos(idproductos);


--
-- TOC entry 5068 (class 2606 OID 16760)
-- Name: venta venta_idusuarios_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_idusuarios_fkey FOREIGN KEY (idusuarios) REFERENCES public.usuarios(idusuarios);


-- Completed on 2026-05-28 01:33:45

--
-- PostgreSQL database dump complete
--

\unrestrict E1LczuM7obpeLQ1q8L66DuVAqXQ8izgNBZjHJ3l5UiL1JIEaMRqB4faC1Xd1GA7

