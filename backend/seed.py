import asyncio
from sqlalchemy import select, delete
from app.core.database import engine, Base, AsyncSessionLocal
from app.models.automotive import Brand, Car, Subsystem, Part, Fastener


async def seed_data():
    print("Re-initializing tables on Neon PostgreSQL...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        print("Clearing tables for deep architectural decomposition seed...")
        await session.execute(delete(Fastener))
        await session.execute(delete(Part))
        await session.execute(delete(Car))
        await session.execute(delete(Subsystem))
        await session.execute(delete(Brand))
        await session.commit()

        print("Seeding 4 Primary Architectural Categories (Subsystems)...")
        categories_data = [
            {"name": "Powertrain", "description": "4.0L Boxer Flat-6 dry-sump block, rigid valvetrain, titanium exhaust, individual throttle bodies"},
            {"name": "Cabin & Doors", "description": "CFRP lightweight door shells, textile pull loops, FIA carbon bucket seats, titanium roll cage"},
            {"name": "BIW & Roof", "description": "Hybrid aluminum-steel monocoque, AZ31B magnesium double-bubble roof, rear shock towers"},
            {"name": "Chassis & Aero", "description": "Active swan-neck wing, front S-duct nostrils, teardrop wishbones, PCCB carbon-ceramic brakes"},
        ]
        subsystem_map = {}
        for cat in categories_data:
            obj = Subsystem(**cat)
            session.add(obj)
            await session.flush()
            subsystem_map[obj.name] = obj

        print("Seeding Brands...")
        porsche = Brand(name="Porsche", country="Germany", logo_url="/logos/porsche.svg")
        vw = Brand(name="Volkswagen", country="Germany", logo_url="/logos/vw.svg")
        mclaren = Brand(name="McLaren", country="United Kingdom", logo_url="/logos/mclaren.svg")
        ferrari = Brand(name="Ferrari", country="Italy", logo_url="/logos/ferrari.svg")
        nissan = Brand(name="Nissan", country="Japan", logo_url="/logos/nissan.svg")
        session.add_all([porsche, vw, mclaren, ferrari, nissan])
        await session.flush()

        print("Seeding 5 Benchmark Motorsport Cars...")
        gt3_rs = Car(
            brand_id=porsche.id,
            model="911 GT3 RS",
            trim="Weissach Homologation Package (992)",
            year=2024,
            vin_prefix="WP0AF2A9",
            image_url="/assets/porsche-gt3rs-cutaway.jpg",
        )
        golf_r = Car(
            brand_id=vw.id,
            model="Golf R",
            trim="Mk8 20 Years Edition",
            year=2024,
            vin_prefix="WVWZZZCD",
            image_url="/assets/vw-golfr-cutaway.jpg",
        )
        mclaren_f1 = Car(
            brand_id=mclaren.id,
            model="F1 (XP5)",
            trim="Central Cockpit Le Mans Benchmark",
            year=1993,
            vin_prefix="SA9AB54B",
            image_url="/assets/mclaren-f1-cutaway.jpg",
        )
        ferrari_f40 = Car(
            brand_id=ferrari.id,
            model="F40",
            trim="Tipo F120A Homologation",
            year=1987,
            vin_prefix="ZFFGJ34B",
            image_url="/assets/ferrari-f40-cutaway.jpg",
        )
        skyline_r34 = Car(
            brand_id=nissan.id,
            model="Skyline GT-R (R34)",
            trim="V-Spec II Nürburgring Spec",
            year=1999,
            vin_prefix="BNR34-00",
            image_url="/assets/skyline-r34-cutaway.jpg",
        )
        session.add_all([gt3_rs, golf_r, mclaren_f1, ferrari_f40, skyline_r34])
        await session.flush()

        # =========================================================================
        # PORSCHE 911 GT3 RS: DEEP MULTI-LEVEL ASSEMBLY DECOMPOSITION
        # =========================================================================
        print("Seeding Deep Hierarchical Assembly Decomposition for Porsche 911 GT3 RS...")

        # -------------------------------------------------------------------------
        # CATEGORY 1: POWERTRAIN (Engine Block, Valvetrain, Dry Sump, Exhaust)
        # -------------------------------------------------------------------------
        p_valvetrain = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Powertrain"].id,
            part_number="992-109-015-RS",
            name="Rigid Finger-Follower Valvetrain & DLC Camshaft Assembly",
            category="Powertrain",
            sub_assembly="Rigid Valvetrain",
            physical_layer="Layer 2: Internal Core",
            material="Forged Titanium & Special High-Speed Alloy Steel (100Cr6)",
            surface_treatment="Diamond-Like Carbon (DLC) coating (1.8 µm thickness, 3000 HV hardness)",
            weight_kg=8.4,
            function="Eliminates hydraulic lifter float up to 9,000 RPM; rigid shims transmit instantaneous valve opening acceleration directly without deflection.",
            manufacturing_process="Precision micro-forging followed by PVD vacuum chamber DLC vapor deposition",
            joint_spec="M7x1.0 Grade 12.9 Camshaft Bearing Cap Bolts (16 Nm torque)",
        )

        p_drysump = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Powertrain"].id,
            part_number="992-107-020-GT",
            name="Multi-Stage Dry-Sump Crankcase & Centrifugal Oil Scavenge Array",
            category="Powertrain",
            sub_assembly="Dry Sump System",
            physical_layer="Layer 2: Internal Core",
            material="Cast Alusil (AlSi17Cu4Mg) Aluminum-Silicon Alloy",
            surface_treatment="PTWA (Plasma Transferred Wire Arc) iron cylinder bore liner spray",
            weight_kg=48.5,
            function="Maintains uninterrupted crankcase oil evacuation under sustained 2.5G lateral cornering forces without cavitation or aeration.",
            manufacturing_process="Low-pressure sand casting with chilled cast-iron inserts and CNC horizontal bore honing",
            joint_spec="M11x1.5 Grade 12.9 Torque-to-Yield crankcase cross-bolts (45 Nm + 120° plastic angle stretch)",
        )

        p_exhaust = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Powertrain"].id,
            part_number="992-251-053-TI",
            name="Thin-Wall Titanium Motorsport Exhaust Silencer & Center Dual Tips",
            category="Powertrain",
            sub_assembly="Exhaust & Emission",
            physical_layer="Layer 1: External Hardware",
            material="Grade 5 Titanium (Ti-6Al-4V) & Inconel 751 Heat Shields",
            surface_treatment="Electropolished heat-tinted titanium with micro-ceramic thermal barrier",
            weight_kg=9.8,
            function="Dramatically lightens overhung mass behind rear axle by 10 kg while maintaining tuned 9,000 RPM flat-6 acoustic resonance.",
            manufacturing_process="Orbital CNC mandrel bending + robotic TIG welding under argon purge chambers",
            joint_spec="High-temp V-Band clamps with Inconel 718 self-locking prevailing-torque fasteners (25 Nm)",
        )

        # -------------------------------------------------------------------------
        # CATEGORY 2: CABIN & DOORS (CFRP Shells, Pull Loops, Roll Cage)
        # -------------------------------------------------------------------------
        p_door_skin = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Cabin & Doors"].id,
            part_number="992-831-011-RS",
            name="Full CFRP Monolithic Door Shell & Kevlar Side-Impact Spar",
            category="Cabin & Doors",
            sub_assembly="Door Structure & Skin",
            physical_layer="Layer 1: Outer Structural Skin",
            material="Toray T700 2x2 Twill Carbon Fiber Pre-preg with Aramid (Kevlar 29) Core",
            surface_treatment="Automotive UV-inhibiting polyurethane clear coat (gloss 95+)",
            weight_kg=6.9,
            function="Reduces side unibody weight by 5.5 kg per door while meeting stringent FIA motorsport side-impact intrusion deflection criteria.",
            manufacturing_process="Autoclave consolidated pre-preg molding (135°C @ 6 bar pressure)",
            joint_spec="M8x1.25 Grade 10.9 Triple-Square XZN hinge fasteners (34 Nm + 45° angle spec)",
        )

        p_roll_cage = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Cabin & Doors"].id,
            part_number="992-800-450-TI",
            name="Weissach Homologation Lightweight Titanium Rear Roll Cage Bar",
            category="Cabin & Doors",
            sub_assembly="Cabin Safety Cell",
            physical_layer="Layer 3: Safety Structure",
            material="Ti-3Al-2.5V (Grade 9) Seamless Aerospace Titanium Tubing",
            surface_treatment="Bead-blasted satin titanium finish",
            weight_kg=11.8,
            function="Increases unibody torsional rigidity across rear shock towers while reducing cage weight by 12 kg compared to chrome-moly steel.",
            manufacturing_process="Mandrel tube bending with orbital laser-cut gussets and manual inert-gas GTAW welds",
            joint_spec="FIA-homologated Grade 10.9 M10 shear bolts into unibody reinforced anchor pads (50 Nm)",
        )

        # -------------------------------------------------------------------------
        # CATEGORY 3: BIW & ROOF (Magnesium Roof, Shock Towers, Monocoque)
        # -------------------------------------------------------------------------
        p_mag_roof = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["BIW & Roof"].id,
            part_number="992-817-010-MG",
            name="Magnesium Double-Bubble Lightweight Roof Panel & Header Bows",
            category="BIW & Roof",
            sub_assembly="Magnesium Roof Assembly",
            physical_layer="Layer 1: Structural Upper Shell",
            material="AZ31B-H24 Magnesium Alloy (1.1 mm gauge thickness)",
            surface_treatment="Keronite plasma electrolytic oxidation (PEO) dielectric anti-galvanic coating",
            weight_kg=4.1,
            function="Lowers vehicle center of gravity height by 7.5 mm; double-bubble channels generate laminar cockpit airflow into rear wing.",
            manufacturing_process="Superplastic sheet thermoforming at 440°C with 5-axis CNC laser trimmed flanges",
            joint_spec="Continuous structural adhesive bead (Dow Betamate 2090 crash-toughened epoxy) + M5 titanium grounding bolts (6.2 Nm)",
        )

        p_shock_towers = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["BIW & Roof"].id,
            part_number="992-501-445-GT",
            name="Vacuum Die-Cast Front & Rear Suspension Turret Node Brackets",
            category="BIW & Roof",
            sub_assembly="Monocoque Subframe Nodes",
            physical_layer="Layer 2: Structural Core Nodes",
            material="Cast AlSi10MnMg Aluminum Alloy & 22MnB5 Hot-Stamped Boron Steel Rebar",
            surface_treatment="Zinc-nickel corrosion resistance electroplate (12 µm)",
            weight_kg=8.7,
            function="Directly transfers extreme aerodynamic downforce (860 kg) into the passenger cell without localized elastic deflection.",
            manufacturing_process="High-vacuum high-pressure die casting (HPDC) with integral thermal heat-treatment T6",
            joint_spec="Self-piercing rivets (SPR) + flow-drill screws (FDS) + M10 Grade 10.9 chassis fasteners (55 Nm)",
        )

        # -------------------------------------------------------------------------
        # CATEGORY 4: CHASSIS & AERO (Swan-Neck Wing, S-Duct, Teardrop Arms, PCCB)
        # -------------------------------------------------------------------------
        p_swan_wing = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Chassis & Aero"].id,
            part_number="992-827-901-RS",
            name="Active Swan-Neck Dual-Element CFRP Rear Wing & Hydraulic DRS Actuator",
            category="Chassis & Aero",
            sub_assembly="Active Aerodynamics",
            physical_layer="Layer 1: Outer Aerodynamic Foil",
            material="High-Modulus Carbon Pre-preg & CNC 7075-T6 Billet Aluminum Uprights",
            surface_treatment="Satin matte carbon-weave clear coat with hard-anodized black pylons",
            weight_kg=7.2,
            function="Generates 860 kg of peak aerodynamic downforce at 285 km/h; upper flap pivots 34 degrees via electro-hydraulic cylinder for DRS low-drag mode.",
            manufacturing_process="135°C high-pressure autoclave consolidation with structural Rohacell foam core",
            joint_spec="M8x1.25 Grade 10.9 Torx bolts into billet unibody-linked shock tower brackets (42 Nm)",
        )

        p_sduct_hood = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Chassis & Aero"].id,
            part_number="992-823-031-CF",
            name="Central-Radiator S-Duct Carbon Hood & Turning Vane Louvers",
            category="Chassis & Aero",
            sub_assembly="Active Aerodynamics",
            physical_layer="Layer 1: Outer Aerodynamic Foil",
            material="CFRP Carbon-Weave Monocoque with Titanium Strike Plates",
            surface_treatment="Gloss UV-protective gel coat with visible herringbone carbon alignment",
            weight_kg=3.8,
            function="Expels heated radiator air outward over the fenders, preserving clean ambient air for the roof scoop and flat-6 intake plenums.",
            manufacturing_process="High-pressure resin transfer molding (HP-RTM) with integral air-guide ducting",
            joint_spec="Dual motorsport rotary safety latch pins + M6 stainless countersunk screws (9.5 Nm)",
        )

        p_suspension = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Chassis & Aero"].id,
            part_number="992-407-151-GT",
            name="Airfoil Teardrop-Profile Double-Wishbone & 5-Axis Knuckle Upright",
            category="Chassis & Aero",
            sub_assembly="Front Suspension & Knuckle",
            physical_layer="Layer 2: Dynamic Chassis Core",
            material="Forged AlSi10Mg Aluminum & 42CrMo4 Quenched & Tempered Steel Spindle",
            surface_treatment="Hard anodized type III matte finish with anti-fretting moly-paste",
            weight_kg=5.6,
            function="Airfoil shape generates 40 kg front downforce; multi-link geometry provides anti-dive stabilization under 1.8G braking decelerations.",
            manufacturing_process="Closed-die hydraulic drop forging followed by 5-axis high-speed CNC contouring",
            joint_spec="M14x1.5 Grade 12.9 Ball-joint stud (140 Nm) + M10 Grade 10.9 damper mount (65 Nm)",
        )

        p_pccb_brakes = Part(
            car_id=gt3_rs.id,
            subsystem_id=subsystem_map["Chassis & Aero"].id,
            part_number="992-615-301-PCCB",
            name="410mm PCCB Carbon-Silicon Carbide Brake Rotor & Center-Lock Hub",
            category="Chassis & Aero",
            sub_assembly="Braking & Hub Assembly",
            physical_layer="Layer 2: Dynamic Chassis Core",
            material="C/SiC Carbon-Ceramic Matrix Core & Forged 7075-T6 Aerospace Aluminum Bell",
            surface_treatment="Laser-pyrolyzed ceramic friction layer with thermal barrier coating",
            weight_kg=6.8,
            function="Withstands continuous track temperatures above 850°C without brake fade; saves 50% unsprung rotational mass vs cast iron.",
            manufacturing_process="Liquid silicon infiltration (LSI) at 1,450°C in vacuum furnace",
            joint_spec="M30x1.5 Special Motorsport Center-Lock Nut (600 Nm with Castrol Optimoly paste)",
        )

        # Commit all components
        all_gt3_parts = [
            p_valvetrain, p_drysump, p_exhaust,
            p_door_skin, p_roll_cage,
            p_mag_roof, p_shock_towers,
            p_swan_wing, p_sduct_hood, p_suspension, p_pccb_brakes
        ]
        session.add_all(all_gt3_parts)
        await session.flush()

        # =========================================================================
        # SEED FASTENERS & CALIBRATED INTERACTIVE POINTER PINS
        # Coordinates aligned directly to the 4-View Orthographic Blueprint
        # =========================================================================
        gt3_fasteners = [
            # 1. Hood S-Duct Nostril Latch
            Fastener(
                part_id=p_sduct_hood.id,
                name="S-Duct Hood Carbon Quick-Latch Pin",
                fastener_type="Pin",
                thread_size="M6x1.0",
                drive_type="Torx T25",
                grade="8.8 A4-70",
                torque_spec_nm=9.5,
                quantity_used=4,
                x_percent=26.5,
                y_percent=42.0,
                notes="Countersunk aerodynamic aero-latch into carbon hood inner skin.",
            ),
            # 2. Front Double-Wishbone Knuckle Anchor
            Fastener(
                part_id=p_suspension.id,
                name="Teardrop Wishbone Lower Ball-Joint Spindle Stud",
                fastener_type="Bolt",
                thread_size="M14x1.5",
                drive_type="Hex 21mm",
                grade="12.9",
                torque_spec_nm=140.0,
                quantity_used=2,
                x_percent=31.0,
                y_percent=72.5,
                notes="Critical suspension safety anchor: 140 Nm. Torque-to-yield stretch bolt; replace upon removal.",
            ),
            # 3. PCCB Center-Lock Nut
            Fastener(
                part_id=p_pccb_brakes.id,
                name="Motorsport Forged Center-Lock Wheel Nut",
                fastener_type="Nut",
                thread_size="M30x1.5 Special",
                drive_type="3/4-inch Center-Lock Drive",
                grade="Forged 7075-T6 Anodized",
                torque_spec_nm=600.0,
                quantity_used=4,
                x_percent=31.2,
                y_percent=81.0,
                notes="Requires exactly 600 Nm tightening torque. Castrol Optimoly TA paste mandatory on conical seats.",
            ),
            # 4. CFRP Door Shell Hinge
            Fastener(
                part_id=p_door_skin.id,
                name="CFRP Door Hinge High-Tensile Fastener",
                fastener_type="Bolt",
                thread_size="M8x1.25",
                drive_type="Triple Square XZN M8",
                grade="10.9",
                torque_spec_nm=34.0,
                quantity_used=4,
                x_percent=44.0,
                y_percent=52.0,
                notes="34 Nm + 45 deg angle torque. Micro-encapsulated threadlocker pre-applied.",
            ),
            # 5. Magnesium Double-Bubble Roof Anchor
            Fastener(
                part_id=p_mag_roof.id,
                name="Magnesium Double-Bubble Structural Bonding Fastener",
                fastener_type="Bolt",
                thread_size="M5x0.8",
                drive_type="Torx T25",
                grade="Grade 5 Titanium",
                torque_spec_nm=6.2,
                quantity_used=8,
                x_percent=51.5,
                y_percent=26.0,
                notes="Electroless nickel plated to eliminate galvanic corrosion against magnesium alloy.",
            ),
            # 6. Titanium Roll Cage Pad Anchor
            Fastener(
                part_id=p_roll_cage.id,
                name="Titanium Roll Cage Unibody Pad Anchor",
                fastener_type="Bolt",
                thread_size="M10x1.5",
                drive_type="Hex 16mm",
                grade="10.9",
                torque_spec_nm=50.0,
                quantity_used=6,
                x_percent=58.0,
                y_percent=44.0,
                notes="FIA-homologated grade 10.9 high shear fasteners into reinforced steel unibody plates.",
            ),
            # 7. Valvetrain Camshaft Cap Bolt
            Fastener(
                part_id=p_valvetrain.id,
                name="DLC Camshaft Rigid Bearing Cap Bolt",
                fastener_type="Bolt",
                thread_size="M7x1.0",
                drive_type="Torx E10",
                grade="12.9",
                torque_spec_nm=16.0,
                quantity_used=16,
                x_percent=68.5,
                y_percent=50.0,
                notes="High precision valvetrain bearing clamp bolt. 16 Nm exact tightening specification.",
            ),
            # 8. Dry-Sump Crankcase Cross-Bolt
            Fastener(
                part_id=p_drysump.id,
                name="Dry-Sump Flat-6 Main Bearing Cross-Bolt",
                fastener_type="Bolt",
                thread_size="M11x1.5",
                drive_type="Torx E14",
                grade="12.9",
                torque_spec_nm=85.0,
                quantity_used=12,
                x_percent=72.0,
                y_percent=60.0,
                notes="Cross-bolted dry-sump main bearing support. 85 Nm + 90 deg plastic stretch deformation.",
            ),
            # 9. Swan-Neck Active Rear Wing Billet Mount
            Fastener(
                part_id=p_swan_wing.id,
                name="Swan-Neck Pylon Billet Chassis Mount Bolt",
                fastener_type="Bolt",
                thread_size="M8x1.25",
                drive_type="Hex 13mm",
                grade="10.9",
                torque_spec_nm=42.0,
                quantity_used=6,
                x_percent=81.0,
                y_percent=28.0,
                notes="Anchor point transmits up to 860 kg aerodynamic downforce directly into rear BIW shock towers.",
            ),
            # 10. Titanium Center Exhaust V-Band Clamp
            Fastener(
                part_id=p_exhaust.id,
                name="Titanium Center-Exit Muffler V-Band Clamp",
                fastener_type="Bolt",
                thread_size="M6x1.0",
                drive_type="Hex 10mm",
                grade="Inconel 718",
                torque_spec_nm=25.0,
                quantity_used=2,
                x_percent=84.5,
                y_percent=74.0,
                notes="High-temperature Inconel hardware withstands continuous exhaust gas temperatures > 920°C.",
            ),
        ]
        session.add_all(gt3_fasteners)

        # -------------------------------------------------------------------------
        # VW Golf R (Mk8) Component Seed
        # -------------------------------------------------------------------------
        vw_bumper = Part(
            car_id=golf_r.id,
            subsystem_id=subsystem_map["Chassis & Aero"].id,
            part_number="5H0-807-217-GRU",
            name="Front Bumper Fascia & Gloss Black Air Guide Mesh",
            category="Chassis & Aero",
            sub_assembly="Aerodynamic Fascias",
            physical_layer="Layer 1: External Body Skin",
            material="Polypropylene Copolymer (PP-EPDM)",
            surface_treatment="Metallic basecoat + high-gloss clearcoat",
            weight_kg=7.1,
            function="Directs cooling airflow to auxiliary DSG and oil coolers; houses front radar sensors.",
            manufacturing_process="Injection molded with robotically painted metallic finish",
            joint_spec="M6 Torx T25 screws + plastic expander clips",
        )
        vw_engine = Part(
            car_id=golf_r.id,
            subsystem_id=subsystem_map["Powertrain"].id,
            part_number="06Q-100-031-H",
            name="2.0L TSI EA888 Gen 4 Turbocharged Cast-Iron Block",
            category="Powertrain",
            sub_assembly="Crankcase & Cylinders",
            physical_layer="Layer 2: Internal Core",
            material="GJL-250 Grey Cast Iron",
            surface_treatment="Induction hardened crank journals",
            weight_kg=142.0,
            function="Generates 320 PS and 420 Nm torque with Continental R-Performance turbocharger.",
            manufacturing_process="Vertical sand core casting with induction-hardened crank journals",
            joint_spec="M10x1.5 Grade 10.9 cylinder head bolts (40 Nm + 90° + 90°)",
        )
        vw_strut = Part(
            car_id=golf_r.id,
            subsystem_id=subsystem_map["Chassis & Aero"].id,
            part_number="5WA-412-021-AC",
            name="DCC Adaptive MacPherson Front Strut Assembly",
            category="Chassis & Aero",
            sub_assembly="Front Suspension",
            physical_layer="Layer 2: Suspension & Dynamics",
            material="Forged Aluminum Knuckle & High-Strength Steel Damper Tube",
            surface_treatment="Cathodic dip coating with polished damper rod",
            weight_kg=12.4,
            function="Provides electronically controlled variable damping with 200 Hz wheel frequency adjustments.",
            manufacturing_process="Forged aluminum steering knuckle with robotically welded steel strut tube",
            joint_spec="M14x1.5 Grade 10.9 pinch bolt through knuckle (70 Nm + 90°)",
        )
        vw_haldex = Part(
            car_id=golf_r.id,
            subsystem_id=subsystem_map["Powertrain"].id,
            part_number="0CP-525-010-J",
            name="R-Performance Torque Vectoring Haldex Rear Differential",
            category="Powertrain",
            sub_assembly="All-Wheel Drive Drivetrain",
            physical_layer="Layer 3: Drivetrain & Differential",
            material="Die-Cast Aluminum Casing & Carbon-Friction Multi-Plate Clutches",
            surface_treatment="Anodized housing with low-friction PTFE oil seals",
            weight_kg=26.5,
            function="Distributes up to 100% of rear drive torque to outside wheel in Special Nürburgring and Drift modes.",
            manufacturing_process="Precision CNC machined high-pressure die-cast aluminum housing",
            joint_spec="M10x1.5 Grade 10.9 subframe mounting bolts (60 Nm + 90°)",
        )
        session.add_all([vw_bumper, vw_engine, vw_strut, vw_haldex])
        await session.flush()

        vw_fasteners = [
            Fastener(
                part_id=vw_bumper.id,
                name="Fascia Lower Underbody Undertray Torx Screw",
                fastener_type="Screw",
                thread_size="M6x1.0",
                drive_type="Torx T25",
                grade="8.8",
                torque_spec_nm=9.0,
                quantity_used=12,
                x_percent=12.0,
                y_percent=70.0,
                notes="Zinc-plated self-tapping collar screw.",
            ),
            Fastener(
                part_id=vw_engine.id,
                name="EA888 Gen 4 Hydro-Bearing Engine Mount Bolt",
                fastener_type="Bolt",
                thread_size="M12x1.5",
                drive_type="Hex 18mm",
                grade="10.9",
                torque_spec_nm=60.0,
                quantity_used=2,
                x_percent=26.0,
                y_percent=52.0,
                notes="Single-use stretch bolt: 60 Nm + 90 deg rotation.",
            ),
            Fastener(
                part_id=vw_strut.id,
                name="MacPherson Strut Pinch Bolt to Knuckle",
                fastener_type="Bolt",
                thread_size="M14x1.5",
                drive_type="Triple-Square M14",
                grade="10.9",
                torque_spec_nm=70.0,
                quantity_used=2,
                x_percent=23.5,
                y_percent=62.0,
                notes="Critical suspension pinch bolt. Requires new lock nut on reassembly.",
            ),
            Fastener(
                part_id=vw_haldex.id,
                name="R-Performance Torque Splitter Subframe Anchor",
                fastener_type="Bolt",
                thread_size="M10x1.5",
                drive_type="Hex 16mm",
                grade="10.9",
                torque_spec_nm=60.0,
                quantity_used=4,
                x_percent=78.5,
                y_percent=68.0,
                notes="Secures rear electro-mechanical differential housing to MQB subframe.",
            ),
        ]
        session.add_all(vw_fasteners)

        await session.commit()
        print("Successfully seeded Porsche 911 GT3 RS with deep 4-category hierarchical decomposition on Neon!")


if __name__ == "__main__":
    asyncio.run(seed_data())
