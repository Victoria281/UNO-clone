--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players (
    userid integer NOT NULL,
    username character varying(45) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    profileicon character varying(255) DEFAULT 'bird'::character varying NOT NULL
);


ALTER TABLE public.players OWNER TO postgres;

--
-- Name: players_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.players_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.players_userid_seq OWNER TO postgres;

--
-- Name: players_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.players_userid_seq OWNED BY public.players.userid;


--
-- Name: uno_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uno_cards (
    card_id integer NOT NULL,
    color character varying(45) NOT NULL,
    "values" numeric NOT NULL,
    image_file character varying(255) NOT NULL
);


ALTER TABLE public.uno_cards OWNER TO postgres;

--
-- Name: uno_cards_card_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uno_cards_card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uno_cards_card_id_seq OWNER TO postgres;

--
-- Name: uno_cards_card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uno_cards_card_id_seq OWNED BY public.uno_cards.card_id;


--
-- Name: uno_effects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uno_effects (
    effectid integer NOT NULL,
    uno_values numeric NOT NULL,
    effect character varying(145) NOT NULL
);


ALTER TABLE public.uno_effects OWNER TO postgres;

--
-- Name: uno_effects_effectid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uno_effects_effectid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uno_effects_effectid_seq OWNER TO postgres;

--
-- Name: uno_effects_effectid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uno_effects_effectid_seq OWNED BY public.uno_effects.effectid;


--
-- Name: uno_leaderboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uno_leaderboard (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL REFERENCES players(userid),
  score INTEGER NOT NULL DEFAULT 0,
  game_status INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.uno_leaderboard OWNER TO postgres;

--
-- Name: uno_leaderboard_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uno_leaderboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uno_leaderboard_id_seq OWNER TO postgres;

--
-- Name: uno_leaderboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uno_leaderboard_id_seq OWNED BY public.uno_leaderboard.id;


--
-- Name: players userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players ALTER COLUMN userid SET DEFAULT nextval('public.players_userid_seq'::regclass);


--
-- Name: uno_cards card_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_cards ALTER COLUMN card_id SET DEFAULT nextval('public.uno_cards_card_id_seq'::regclass);


--
-- Name: uno_effects effectid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_effects ALTER COLUMN effectid SET DEFAULT nextval('public.uno_effects_effectid_seq'::regclass);


--
-- Name: uno_leaderboard id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_leaderboard ALTER COLUMN id SET DEFAULT nextval('public.uno_leaderboard_id_seq'::regclass);


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.players (userid, username, email, password, created_at, profileicon) FROM stdin;
17	t3	t3@gmail.com	$2b$10$nx1gimQUduev11T/SocEde5JqeXEnT1/Gj/jqzBCvqlhBaOiaiDGe	2021-11-15 11:32:44.202216	bird
26	t11	t11@gmail.com	$2b$10$mxfVRYC5b5jlV87rqnnIaO7b/WJz3ADnP.OReW5.eu/Le4qCM3DvO	2021-11-16 00:46:45.855368	bird
27	t2	t2@gmail.com	$2b$10$UiJgTTntkPk9CPDFu3Kn2O5XyxMVOAzLwkX/V4BtTwXM3epkyINwy	2021-11-16 00:48:55.012633	bird
28	t4	t4@gmail.com	$2b$10$uz5fs0L8Is52RAnmJ5VOie/sB2LxgNqR2mxBfds7jtNAMCCP/MiI6	2021-11-16 00:49:01.538011	bird
29	t5	t5@gmail.com	$2b$10$nCfuu0OIAqMVxscX.gFzFubFH3TTzvSECFnMpzJxwmc8hfAVgDbE2	2021-11-16 00:49:08.859845	bird
30	t6	t6@gmail.com	$2b$10$chGxCyEpnpZIzUdoIp72HezFiRI/ES.xcN1uXb7XmUX9LhUnXmfgq	2021-11-16 00:49:13.195443	bird
31	t7	t7@gmail.com	$2b$10$uiD09YkoWR7fkFyVGYjetOXVO2o6bh9U9hT9Mw2XFn./XrkhyIfOW	2021-11-16 00:49:17.39844	bird
15	t1	t1@gmail.com	$2b$10$EyDipLAUDFbyxnKMGn68G.Uzm1.qisY1dH/sDp/R8Oa/Lj8t7K9ue	2021-11-15 11:32:27.967318	shell
32	a1	a1@gmail.com	$2b$10$1uSjSr1R1Wqmy8mk0W8V7O.rZTLkT2cgem6yqH0pqTpQHyNoMAT7a	2021-11-26 16:29:45.100289	bird
33	newname	a2@gmail.com	$2b$10$xB0EczHhQzNrvglq.3AuIe1KG54kA66PL.xP/xolnfdrT4T7r6smm	2021-11-26 16:31:23.30327	turtle
\.


--
-- Data for Name: uno_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uno_cards (card_id, color, "values", image_file) FROM stdin;
0	red	0	./cards/Red_0.png
1	red	1	./cards/Red_1.png
2	red	2	./cards/Red_2.png
3	red	3	./cards/Red_3.png
4	red	4	./cards/Red_4.png
5	red	5	./cards/Red_5.png
6	red	6	./cards/Red_6.png
7	red	7	./cards/Red_7.png
8	red	8	./cards/Red_8.png
9	red	9	./cards/Red_9.png
10	red	10	./cards/Red_Skip.png
11	red	11	./cards/Red_Reverse.png
12	red	12	./cards/Red_Draw.png
13	red	1	./cards/Red_1.png
14	red	2	./cards/Red_2.png
15	red	3	./cards/Red_3.png
16	red	4	./cards/Red_4.png
17	red	5	./cards/Red_5.png
18	red	6	./cards/Red_6.png
19	red	7	./cards/Red_7.png
20	red	8	./cards/Red_8.png
21	red	9	./cards/Red_9.png
22	red	10	./cards/Red_Skip.png
23	red	11	./cards/Red_Reverse.png
24	red	12	./cards/Red_Draw.png
25	wild	13	./cards/Wild.png
26	wild	14	./cards/Wild_Draw.png
27	wild	13	./cards/Wild.png
28	wild	14	./cards/Wild_Draw.png
29	wild	13	./cards/Wild.png
30	wild	14	./cards/Wild_Draw.png
31	wild	13	./cards/Wild.png
32	wild	14	./cards/Wild_Draw.png
33	blue	0	./cards/Blue_0.png
34	blue	1	./cards/Blue_1.png
35	blue	2	./cards/Blue_2.png
36	blue	3	./cards/Blue_3.png
37	blue	4	./cards/Blue_4.png
38	blue	5	./cards/Blue_5.png
39	blue	6	./cards/Blue_6.png
40	blue	7	./cards/Blue_7.png
41	blue	8	./cards/Blue_8.png
42	blue	9	./cards/Blue_9.png
43	blue	10	./cards/Blue_Skip.png
44	blue	11	./cards/Blue_Reverse.png
45	blue	12	./cards/Blue_Draw.png
46	blue	1	./cards/Blue_1.png
47	blue	2	./cards/Blue_2.png
48	blue	3	./cards/Blue_3.png
49	blue	4	./cards/Blue_4.png
50	blue	5	./cards/Blue_5.png
51	blue	6	./cards/Blue_6.png
52	blue	7	./cards/Blue_7.png
53	blue	8	./cards/Blue_8.png
54	blue	9	./cards/Blue_9.png
55	blue	10	./cards/Blue_Skip.png
56	blue	11	./cards/Blue_Reverse.png
57	blue	12	./cards/Blue_Draw.png
58	green	0	./cards/Green_0.png
59	green	1	./cards/Green_1.png
60	green	2	./cards/Green_2.png
61	green	3	./cards/Green_3.png
62	green	4	./cards/Green_4.png
63	green	5	./cards/Green_5.png
64	green	6	./cards/Green_6.png
65	green	7	./cards/Green_7.png
66	green	8	./cards/Green_8.png
67	green	9	./cards/Green_9.png
68	green	10	./cards/Green_Skip.png
69	green	11	./cards/Green_Reverse.png
70	green	12	./cards/Green_Draw.png
71	green	1	./cards/Green_1.png
72	green	2	./cards/Green_2.png
73	green	3	./cards/Green_3.png
74	green	4	./cards/Green_4.png
75	green	5	./cards/Green_5.png
76	green	6	./cards/Green_6.png
77	green	7	./cards/Green_7.png
78	green	8	./cards/Green_8.png
79	green	9	./cards/Green_9.png
80	green	10	./cards/Green_Skip.png
81	green	11	./cards/Green_Reverse.png
82	green	12	./cards/Green_Draw.png
83	yellow	0	./cards/Yellow_0.png
84	yellow	1	./cards/Yellow_1.png
85	yellow	2	./cards/Yellow_2.png
86	yellow	3	./cards/Yellow_3.png
87	yellow	4	./cards/Yellow_4.png
88	yellow	5	./cards/Yellow_5.png
89	yellow	6	./cards/Yellow_6.png
90	yellow	7	./cards/Yellow_7.png
91	yellow	8	./cards/Yellow_8.png
92	yellow	9	./cards/Yellow_9.png
93	yellow	10	./cards/Yellow_Skip.png
94	yellow	11	./cards/Yellow_Reverse.png
95	yellow	12	./cards/Yellow_Draw.png
96	yellow	1	./cards/Yellow_1.png
97	yellow	2	./cards/Yellow_2.png
98	yellow	3	./cards/Yellow_3.png
99	yellow	4	./cards/Yellow_4.png
100	yellow	5	./cards/Yellow_5.png
101	yellow	6	./cards/Yellow_6.png
102	yellow	7	./cards/Yellow_7.png
103	yellow	8	./cards/Yellow_8.png
104	yellow	9	./cards/Yellow_9.png
105	yellow	10	./cards/Yellow_Skip.png
106	yellow	11	./cards/Yellow_Reverse.png
107	yellow	12	./cards/Yellow_Draw.png
\.

--
-- Data for Name: uno_effects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uno_effects (effectid, uno_values, effect) FROM stdin;
0	0	number
1	1	number
2	2	number
3	3	number
4	4	number
5	5	number
6	6	number
7	7	number
8	8	number
9	9	number
10	10	skip
11	11	reverse
12	12	draw
13	13	wild
14	14	wilddraw
\.


--
-- Data for Name: uno_leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
  uno_leaderboard (userid, score, game_status)
VALUES
  (17, 5975, 1),
  (26, 2311, 1),
  (27, 2122, 0),
  (28, 100, 0),
  (29, 0, 0),
  (30, 3441, 1),
  (31, 11, 0),
  (15, 211, 0),
  (33, 222, 0),
  (17, 5990, 1),
  (26, 2312, 1),
  (27, 2123, 0),
  (28, 101, 0),
  (29, 1, 0),
  (30, 3442, 1),
  (31, 12, 0),
  (15, 212, 0),
  (33, 223, 0),
  (17, 5991, 1),
  (26, 2313, 1),
  (27, 2124, 0),
  (28, 102, 0),
  (29, 2, 0),
  (30, 3443, 1),
  (31, 13, 0),
  (15, 213, 0),
  (33, 224, 0);


--
-- Name: players_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.players_userid_seq', 33, true);


--
-- Name: uno_cards_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uno_cards_card_id_seq', 2, true);


--
-- Name: uno_effects_effectid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uno_effects_effectid_seq', 1, false);


--
-- Name: uno_leaderboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uno_leaderboard_id_seq', 20, true);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (userid);


--
-- Name: uno_cards uno_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_cards
    ADD CONSTRAINT uno_cards_pkey PRIMARY KEY (card_id);


--
-- Name: uno_effects uno_effects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_effects
    ADD CONSTRAINT uno_effects_pkey PRIMARY KEY (effectid);


--
-- Name: uno_leaderboard uno_leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_leaderboard
    ADD CONSTRAINT uno_leaderboard_pkey PRIMARY KEY (id);


--
-- Name: uno_leaderboard fk_userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uno_leaderboard
    ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.players(userid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--