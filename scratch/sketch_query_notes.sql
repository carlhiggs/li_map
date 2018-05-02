

DROP TABLE IF EXISTS li_map_full_hard;
CREATE TABLE li_map_full_hard AS
SELECT
t1.sa1_7dig11                                                                ,
suburb                                                                       ,
lga                                                                          ,
round(ih_li_ci_est::numeric,1) AS ih_li_ci_est                              ,
round(ih_walkability::numeric,1) AS ih_walkability                          ,
round(ih_si_mix::numeric,1) AS ih_si_mix                                    ,
round(ih_dest_pt::numeric,1) AS ih_dest_pt                                  ,
round(ih_pos15000_access::numeric,1) AS ih_pos15000_access                  ,
round(ih_pred_no2_2011_col_ppb::numeric,1) AS ih_pred_no2_2011_col_ppb      ,
round(ih_prop_affordablehousing::numeric,1) AS ih_prop_affordablehousing    ,
round(ih_prop_live_work::numeric,1) AS ih_prop_live_work                    ,
round(rh_li_ci_est::numeric,1) AS rh_li_ci_est                              ,
round(rh_walkability::numeric,1) AS rh_walkability                          ,
round(rh_si_mix::numeric,1) AS rh_si_mix                                    ,
round(100*rh_dest_pt::numeric,1) AS rh_dest_pt                              ,
round(100*rh_pos15000_access::numeric,1) AS rh_pos15000_access              ,
round(rh_pred_no2_2011_col_ppb::numeric,1) AS rh_pred_no2_2011_col_ppb      ,
round(100*rh_prop_affordablehousing::numeric,1) AS rh_prop_affordablehousing ,
round(100*rh_prop_live_work::numeric,1) AS rh_prop_live_work                ,
ph_li_ci_est                                                                ,
ph_walkability                                                              ,
ph_si_mix                                                                   ,
ph_dest_pt                                                                  ,
ph_pos15000_access                                                          ,
ph_pred_no2_2011_col_ppb                                                    ,
ph_prop_affordablehousing                                                   ,
ph_prop_live_work                                                           ,
round(ph_ll_025_li::numeric,1) AS ph_ll_025_li                              ,
round(ph_ul_975_li::numeric,1) AS ph_ul_975_li                              ,
round(wih_var_li::numeric,2) AS wih_var_li                                  ,
round(bwh_var_li::numeric,2) AS bwh_var_li                                  ,
round(ghrh_li::numeric,2) AS ghrh_li                                        ,
round(ph_ll_025_wa::numeric,1) AS ph_ll_025_wa                              ,
round(ph_ul_975_wa::numeric,1) AS ph_ul_975_wa                              ,
round(wih_var_wa::numeric,2) AS wih_var_wa                                  ,
round(bwh_var_wa::numeric,2) AS bwh_var_wa                                  ,
round(ghrh_wa::numeric,2) AS ghrh_wa                                        ,
round(ph_ll_025_si::numeric,1) AS ph_ll_025_si                              ,
round(ph_ul_975_si::numeric,1) AS ph_ul_975_si                              ,
round(wih_var_si::numeric,2) AS wih_var_si                                  ,
round(bwh_var_si::numeric,2) AS bwh_var_si                                  ,
round(ghrh_si::numeric,2) AS ghrh_si                                        ,
round(100*ph_ll_025_de::numeric,1) AS ph_ll_025_de                              ,
round(100*ph_ul_975_de::numeric,1) AS ph_ul_975_de                              ,
round(wih_var_de::numeric,2) AS wih_var_de                                  ,
round(bwh_var_de::numeric,2) AS bwh_var_de                                  ,
round(ghrh_de::numeric,2) AS ghrh_de                                        ,
round(100*ph_ll_025_po::numeric,1) AS ph_ll_025_po                              ,
round(100*ph_ul_975_po::numeric,1) AS ph_ul_975_po                              ,
round(wih_var_po::numeric,2) AS wih_var_po                                  ,
round(bwh_var_po::numeric,2) AS bwh_var_po                                  ,
round(ghrh_po::numeric,2) AS ghrh_po                                        ,
round(ph_ll_025_pr::numeric,1) AS ph_ll_025_pr                              ,
round(ph_ul_975_pr::numeric,1) AS ph_ul_975_pr                              ,
round(wih_var_pr::numeric,2) AS wih_var_pr                                  ,
round(bwh_var_pr::numeric,2) AS bwh_var_pr                                  ,
round(ghrh_pr::numeric,2) AS ghrh_pr                                        ,
round(100*ph_ll_025_af::numeric,1) AS ph_ll_025_af                          ,
round(100*ph_ul_975_af::numeric,1) AS ph_ul_975_af                          ,
round(wih_var_af::numeric,2) AS wih_var_af                                  ,
round(bwh_var_af::numeric,2) AS bwh_var_af                                  ,
round(ghrh_af::numeric,2) AS ghrh_af                                        ,
round(100*ph_ll_025_lw::numeric,1) AS ph_ll_025_lw                          ,
round(100*ph_ul_975_lw::numeric,1) AS ph_ul_975_lw                          ,
round(wih_var_lw::numeric,2) AS wih_var_lw                                  ,
round(bwh_var_lw::numeric,2) AS bwh_var_lw                                  ,
round(ghrh_lw::numeric,2) AS ghrh_lw                                        ,
round(m_daily_living,1) AS m_daily_living                                    ,
ph_ll_025_da                                                                 ,
ph_ul_975_da                                                                 ,
round(wih_var_da,2) AS wih_var_da                                            ,
round(bwh_var_da::numeric,2) AS bwh_var_da                                  ,
round(ghrh_da,2) AS ghrh_da                                                 ,
round(z_dl::numeric,2) AS z_dl                                              ,
ph_dl                                                                        ,
round(m_dd::numeric,1) AS m_dd                                              ,
round(ph_ll_025_dd::numeric,1) AS ph_ll_025_dd                              ,
round(ph_ul_975_dd::numeric,1) AS ph_ul_975_dd                              ,
round(wih_var_dd::numeric,2) AS wih_var_dd                                  ,
round(bwh_var_dd::numeric,2) AS bwh_var_dd                                  ,
round(ghrh_dd::numeric,2) AS ghrh_dd                                        ,
ph_dd                                                                        ,
round(z_dd::numeric,2) AS z_dd                                              ,
round(m_sc::numeric,1) AS m_sc                                              ,
round(ph_ll_025_sc::numeric,1) AS ph_ll_025_sc                              ,
round(ph_ul_975_sc::numeric,1) AS ph_ul_975_sc                              ,
round(wih_var_sc::numeric,2) AS wih_var_sc                                  ,
round(bwh_var_sc::numeric,2) AS bwh_var_sc                                  ,
round(ghrh_sc::numeric,2) AS ghrh_sc                                        ,
round(z_sc::numeric,2) AS z_sc                                              ,
ph_sc                                                                        ,
gid                                                                          ,
geom
FROM
(SELECT
sa1_7dig11                                             ,
li_ci_est             -100 AS ih_li_ci_est             ,
walkability           -100 AS ih_walkability           ,
si_mix                -100 AS ih_si_mix                ,
dest_pt               -100 AS ih_dest_pt               ,
pos15000_access       -100 AS ih_pos15000_access       ,
pred_no2_2011_col_ppb -100 AS ih_pred_no2_2011_col_ppb ,
prop_affordablehousing-100 AS ih_prop_affordablehousing,
prop_live_work        -100 AS ih_prop_live_work        
FROM li_mpi_norm_hard_sa1_7dig11) AS t1
LEFT JOIN
(SELECT
sa1_7dig11                                             ,
li_ci_est                  AS rh_li_ci_est             ,
walkability                AS rh_walkability           ,
si_mix                     AS rh_si_mix                ,
dest_pt                    AS rh_dest_pt               ,
pos15000_access            AS rh_pos15000_access       ,
pred_no2_2011_col_ppb      AS rh_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS rh_prop_affordablehousing,
sa2_prop_live_work_sa3     AS rh_prop_live_work        
FROM li_raw_hard_sa1_7dig11) AS t2 
ON t1.sa1_7dig11 = t2.sa1_7dig11
LEFT JOIN
(SELECT
sa1_7dig11                                              ,
li_ci_est                  AS ph_li_ci_est             ,
walkability                AS ph_walkability           ,
si_mix                     AS ph_si_mix                ,
dest_pt                    AS ph_dest_pt               ,
pos15000_access            AS ph_pos15000_access       ,
pred_no2_2011_col_ppb      AS ph_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS ph_prop_affordablehousing,
sa2_prop_live_work_sa3     AS ph_prop_live_work        
FROM li_percentiles_hard_sa1_7dig11) AS t3
ON t1.sa1_7dig11 = t3.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 - 100 AS ph_ll_025_li, p_ul_975  - 100 AS ph_ul_975_li, within_sa1_7dig11_sd AS wih_var_li, between_sa1_7dig11_sd AS bwh_var_li, ratio_wi_bw_var AS ghrh_li FROM sa1_7dig11_summary_li_ci_est_hard)                   AS t4  ON t1.sa1_7dig11 = t4.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_wa, p_ul_975  AS ph_ul_975_wa, within_sa1_7dig11_sd AS wih_var_wa, between_sa1_7dig11_sd AS bwh_var_wa, ratio_wi_bw_var AS ghrh_wa FROM sa1_7dig11_summary_walkability_raw_hard)                 AS t5  ON t1.sa1_7dig11 = t5.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_si, p_ul_975  AS ph_ul_975_si, within_sa1_7dig11_sd AS wih_var_si, between_sa1_7dig11_sd AS bwh_var_si, ratio_wi_bw_var AS ghrh_si FROM sa1_7dig11_summary_si_mix_raw_hard)                      AS t6  ON t1.sa1_7dig11 = t6.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_de, p_ul_975  AS ph_ul_975_de, within_sa1_7dig11_sd AS wih_var_de, between_sa1_7dig11_sd AS bwh_var_de, ratio_wi_bw_var AS ghrh_de FROM sa1_7dig11_summary_dest_pt_raw_hard)                     AS t7  ON t1.sa1_7dig11 = t7.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_po, p_ul_975  AS ph_ul_975_po, within_sa1_7dig11_sd AS wih_var_po, between_sa1_7dig11_sd AS bwh_var_po, ratio_wi_bw_var AS ghrh_po FROM sa1_7dig11_summary_pos15000_access_raw_hard)             AS t8  ON t1.sa1_7dig11 = t8.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_pr, p_ul_975  AS ph_ul_975_pr, within_sa1_7dig11_sd AS wih_var_pr, between_sa1_7dig11_sd AS bwh_var_pr, ratio_wi_bw_var AS ghrh_pr FROM sa1_7dig11_summary_pred_no2_2011_col_ppb_raw_hard)       AS t9  ON t1.sa1_7dig11 = t9.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_af, p_ul_975  AS ph_ul_975_af, within_sa1_7dig11_sd AS wih_var_af, between_sa1_7dig11_sd AS bwh_var_af, ratio_wi_bw_var AS ghrh_af FROM sa1_7dig11_summary_sa1_prop_affordablehousing_raw_hard)  AS t10 ON t1.sa1_7dig11 = t10.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ph_ll_025_lw, p_ul_975  AS ph_ul_975_lw, within_sa1_7dig11_sd AS wih_var_lw, between_sa1_7dig11_sd AS bwh_var_lw, ratio_wi_bw_var AS ghrh_lw FROM sa1_7dig11_summary_sa2_prop_live_work_sa3_raw_hard)      AS t11 ON t1.sa1_7dig11 = t11.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,m_daily_living,p_ll_025 AS ph_ll_025_da, p_ul_975 AS ph_ul_975_da, within_sa1_7dig11_sd AS wih_var_da, between_sa1_7dig11_sd AS bwh_var_da, ratio_wi_bw_var AS ghrh_da FROM sa1_7dig11_summary_daily_living_raw_hard)                AS t12 ON t1.sa1_7dig11 = t12.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,m_dd_nh1600m AS m_dd, p_ll_025 AS ph_ll_025_dd, p_ul_975 AS ph_ul_975_dd, within_sa1_7dig11_sd AS wih_var_dd, between_sa1_7dig11_sd AS bwh_var_dd, ratio_wi_bw_var AS ghrh_dd FROM sa1_7dig11_summary_dd_nh1600m_raw) AS t13 ON t1.sa1_7dig11 = t13.sa1_7dig11 
LEFT JOIN (SELECT sa1_7dig11,m_sc_nh1600m AS m_sc, p_ll_025 AS ph_ll_025_sc, p_ul_975 AS ph_ul_975_sc, within_sa1_7dig11_sd AS wih_var_sc, between_sa1_7dig11_sd AS bwh_var_sc, ratio_wi_bw_var AS ghrh_sc FROM sa1_7dig11_summary_sc_nh1600m_raw) AS t14 ON t1.sa1_7dig11 = t14.sa1_7dig11
LEFT JOIN 
(SELECT 
abs_linkage.sa1_7dig11,
AVG(z_dl) AS z_dl,
AVG(z_sc) AS z_sc,
AVG(z_dd) AS z_dd,      
ntile(100) OVER(ORDER BY AVG(z_dl)) as ph_dl,
ntile(100) OVER(ORDER BY AVG(z_sc)) as ph_sc,
ntile(100) OVER(ORDER BY AVG(z_dd)) as ph_dd
FROM parcelmb 
LEFT JOIN abs_linkage ON parcelmb.mb_code11 = abs_linkage.mb_code11
LEFT JOIN ind_walkability_hard ON   parcelmb.detail_pid = ind_walkability_hard.detail_pid
GROUP BY sa1_7dig11
ORDER BY sa1_7dig11 ASC) AS t15 ON  t1.sa1_7dig11 = t15.sa1_7dig11
LEFT JOIN sa1_2011_AUST AS t16 ON t1.sa1_7dig11 = t16.sa1_7dig11::numeric
LEFT JOIN sa1_area AS t17 ON t1.sa1_7dig11 = t17.sa1_7dig11;

DROP TABLE IF EXISTS li_map_json_hard;
CREATE TABLE li_map_json_hard AS SELECT row_to_json(fc) FROM 
  (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM 
    (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geom,4326))::json As geometry, 
     row_to_json((
     sa1_7dig11,suburb,lga,ih_li_ci_est,ih_walkability,ih_si_mix,ih_dest_pt,ih_pos15000_access,ih_pred_no2_2011_col_ppb,ih_prop_affordablehousing,ih_prop_live_work,rh_li_ci_est,rh_walkability,rh_si_mix,rh_dest_pt,rh_pos15000_access,rh_pred_no2_2011_col_ppb,rh_prop_affordablehousing,rh_prop_live_work,ph_li_ci_est,ph_walkability,ph_si_mix,ph_dest_pt,ph_pos15000_access,ph_pred_no2_2011_col_ppb,ph_prop_affordablehousing,ph_prop_live_work,ph_ll_025_li,ph_ul_975_li,wih_var_li,bwh_var_li,ghrh_li,ph_ll_025_wa,ph_ul_975_wa,wih_var_wa,bwh_var_wa,ghrh_wa,ph_ll_025_si,ph_ul_975_si,wih_var_si,bwh_var_si,ghrh_si,ph_ll_025_de,ph_ul_975_de,wih_var_de,bwh_var_de,ghrh_de,ph_ll_025_po,ph_ul_975_po,wih_var_po,bwh_var_po,ghrh_po,ph_ll_025_pr,ph_ul_975_pr,wih_var_pr,bwh_var_pr,ghrh_pr,ph_ll_025_af,ph_ul_975_af,wih_var_af,bwh_var_af,ghrh_af,ph_ll_025_lw,ph_ul_975_lw,wih_var_lw,bwh_var_lw,ghrh_lw,m_daily_living,ph_ll_025_da,ph_ul_975_da,wih_var_da,bwh_var_da,ghrh_da,z_dl,ph_dl,m_dd,ph_ll_025_dd,ph_ul_975_dd,wih_var_dd,bwh_var_dd,ghrh_dd,ph_dd,z_dd,m_sc,ph_ll_025_sc,ph_ul_975_sc,wih_var_sc,bwh_var_sc,ghrh_sc,z_sc,ph_sc
     )) As properties FROM 
      (SELECT * FROM li_map_full_hard) As lg) As f) As fc;
      
DROP TABLE IF EXISTS li_map_json_sa1_min_hard;
CREATE TABLE li_map_json_sa1_min_hard AS SELECT row_to_json(fc) FROM 
  (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM 
    (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geom,4326))::json As geometry, 
     row_to_json((
     sa1_7dig11,suburb,lga,ih_li_ci_est,rh_walkability,m_daily_living,m_dd,m_sc,rh_si_mix,rh_dest_pt,rh_pos15000_access,rh_pred_no2_2011_col_ppb,rh_prop_affordablehousing,rh_prop_live_work,ph_li_ci_est,ph_walkability,ph_dl,ph_dd,ph_sc,ph_si_mix,ph_dest_pt,ph_pos15000_access,ph_pred_no2_2011_col_ppb,ph_prop_affordablehousing,ph_prop_live_work
     )) As properties FROM 
      (SELECT * FROM li_map_full_hard) As lg) As f) As fc;
      
-- JSON variable map
--
-- f1   sa1_7dig11            
-- f2   suburb
-- f3   lga
-- f4   ih_li_ci_est             
-- f5   ih_walkability           
-- f6   ih_si_mix                
-- f7   ih_dest_pt               
-- f8   ih_pos15000_access       
-- f9   ih_pred_no2_2011_col_ppb 
-- f10  ih_prop_affordablehousing
-- f11  ih_prop_live_work        
-- f12  rh_li_ci_est             
-- f13  rh_walkability           
-- f14  rh_si_mix                
-- f15  rh_dest_pt               
-- f16  rh_pos15000_access       
-- f17  rh_pred_no2_2011_col_ppb 
-- f18  rh_prop_affordablehousing
-- f19  rh_prop_live_work        
-- f20  ph_li_ci_est             
-- f21  ph_walkability           
-- f22  ph_si_mix                
-- f23  ph_dest_pt               
-- f24  ph_pos15000_access       
-- f25  ph_pred_no2_2011_col_ppb 
-- f26  ph_prop_affordablehousing
-- f27  ph_prop_live_work        
-- f28  ph_ll_025_li             
-- f29  ph_ul_975_li             
-- f30  wih_var_li               
-- f31  bwh_var_li               
-- f32  ghrh_li                  
-- f33  ph_ll_025_wa             
-- f34  ph_ul_975_wa             
-- f35  wih_var_wa               
-- f36  bwh_var_wa               
-- f37  ghrh_wa                  
-- f38  ph_ll_025_si             
-- f39  ph_ul_975_si             
-- f40  wih_var_si               
-- f41  bwh_var_si               
-- f42  ghrh_si                  
-- f43  ph_ll_025_de             
-- f44  ph_ul_975_de             
-- f45  wih_var_de               
-- f46  bwh_var_de               
-- f47  ghrh_de                  
-- f48  ph_ll_025_po             
-- f49  ph_ul_975_po             
-- f50  wih_var_po               
-- f51  bwh_var_po               
-- f52  ghrh_po                  
-- f53  ph_ll_025_pr             
-- f54  ph_ul_975_pr             
-- f55  wih_var_pr               
-- f56  bwh_var_pr               
-- f57  ghrh_pr                  
-- f58  ph_ll_025_af             
-- f59  ph_ul_975_af             
-- f60  wih_var_af               
-- f61  bwh_var_af               
-- f62  ghrh_af                  
-- f63  ph_ll_025_lw             
-- f64  ph_ul_975_lw             
-- f65  wih_var_lw               
-- f66  bwh_var_lw               
-- f67  ghrh_lw                  
-- f68  m_daily_living           
-- f69  ph_ll_025_da             
-- f70  ph_ul_975_da             
-- f71  wih_var_da               
-- f72  bwh_var_da               
-- f73  ghrh_da                  
-- f74  z_dl                     
-- f75  ph_dl                    
-- f76  m_dd                     
-- f77  ph_ll_025_dd             
-- f78  ph_ul_975_dd             
-- f79  wih_var_dd               
-- f80  bwh_var_dd               
-- f81  ghrh_dd                  
-- f82  ph_dd                    
-- f83  z_dd                          
-- f84  m_sc                     
-- f85  ph_ll_025_sc             
-- f86  ph_ul_975_sc             
-- f87  wih_var_sc               
-- f88  bwh_var_sc               
-- f89  ghrh_sc                  
-- f90  z_sc                     
-- f91  ph_sc                       

-- Dev table
DROP TABLE IF EXISTS li_map_json_h_mini;
CREATE TABLE li_map_json_h_mini AS SELECT row_to_json(fc) FROM 
  (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM 
    (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geom,4326))::json As geometry, 
     row_to_json((
     sa1_7dig11,suburb,lga,ih_li_ci_est,ih_walkability,ih_si_mix,ih_dest_pt,ih_pos15000_access,ih_pred_no2_2011_col_ppb,ih_prop_affordablehousing,ih_prop_live_work,rh_li_ci_est,rh_walkability,rh_si_mix,rh_dest_pt,rh_pos15000_access,rh_pred_no2_2011_col_ppb,rh_prop_affordablehousing,rh_prop_live_work,ph_li_ci_est,ph_walkability,ph_si_mix,ph_dest_pt,ph_pos15000_access,ph_pred_no2_2011_col_ppb,ph_prop_affordablehousing,ph_prop_live_work,ph_ll_025_li,ph_ul_975_li,wih_var_li,bwh_var_li,ghrh_li,ph_ll_025_wa,ph_ul_975_wa,wih_var_wa,bwh_var_wa,ghrh_wa,ph_ll_025_si,ph_ul_975_si,wih_var_si,bwh_var_si,ghrh_si,ph_ll_025_de,ph_ul_975_de,wih_var_de,bwh_var_de,ghrh_de,ph_ll_025_po,ph_ul_975_po,wih_var_po,bwh_var_po,ghrh_po,ph_ll_025_pr,ph_ul_975_pr,wih_var_pr,bwh_var_pr,ghrh_pr,ph_ll_025_af,ph_ul_975_af,wih_var_af,bwh_var_af,ghrh_af,ph_ll_025_lw,ph_ul_975_lw,wih_var_lw,bwh_var_lw,ghrh_lw,m_daily_living,ph_ll_025_da,ph_ul_975_da,wih_var_da,bwh_var_da,ghrh_da,z_dl,ph_dl,m_dd,ph_ll_025_dd,ph_ul_975_dd,wih_var_dd,bwh_var_dd,ghrh_dd,ph_dd,z_dd,m_sc,ph_ll_025_sc,ph_ul_975_sc,wih_var_sc,bwh_var_sc,ghrh_sc,z_sc,ph_sc
     )) As properties FROM 
      (SELECT * FROM li_map_full_hard LIMIT 10) As lg) As f) As fc;

      
-- SOFT



DROP TABLE IF EXISTS li_map_full_soft;
CREATE TABLE li_map_full_soft AS
SELECT
t1.sa1_7dig11                                                                ,
suburb                                                                       ,
lga                                                                          ,
round(is_li_ci_est::numeric,1) AS is_li_ci_est                              ,
round(is_walkability::numeric,1) AS is_walkability                          ,
round(is_si_mix::numeric,1) AS is_si_mix                                    ,
round(is_dest_pt::numeric,1) AS is_dest_pt                                  ,
round(is_pos15000_access::numeric,1) AS is_pos15000_access                  ,
round(is_pred_no2_2011_col_ppb::numeric,1) AS is_pred_no2_2011_col_ppb      ,
round(is_prop_affordablehousing::numeric,1) AS is_prop_affordablehousing    ,
round(is_prop_live_work::numeric,1) AS is_prop_live_work                    ,
round(rs_li_ci_est::numeric,1) AS rs_li_ci_est                              ,
round(rs_walkability::numeric,1) AS rs_walkability                          ,
round(rs_si_mix::numeric,1) AS rs_si_mix                                    ,
round(100*rs_dest_pt::numeric,1) AS rs_dest_pt                              ,
round(100*rs_pos15000_access::numeric,1) AS rs_pos15000_access              ,
round(rs_pred_no2_2011_col_ppb::numeric,1) AS rs_pred_no2_2011_col_ppb      ,
round(100*rs_prop_affordablehousing::numeric,1) AS rs_prop_affordablehousing ,
round(100*rs_prop_live_work::numeric,1) AS rs_prop_live_work                ,
ps_li_ci_est                                                                ,
ps_walkability                                                              ,
ps_si_mix                                                                   ,
ps_dest_pt                                                                  ,
ps_pos15000_access                                                          ,
ps_pred_no2_2011_col_ppb                                                    ,
ps_prop_affordablehousing                                                   ,
ps_prop_live_work                                                           ,
round(ps_ll_025_li::numeric,1) AS ps_ll_025_li                              ,
round(ps_ul_975_li::numeric,1) AS ps_ul_975_li                              ,
round(wis_var_li::numeric,2) AS wis_var_li                                  ,
round(bws_var_li::numeric,2) AS bws_var_li                                  ,
round(ghrs_li::numeric,2) AS ghrs_li                                        ,
round(ps_ll_025_wa::numeric,1) AS ps_ll_025_wa                              ,
round(ps_ul_975_wa::numeric,1) AS ps_ul_975_wa                              ,
round(wis_var_wa::numeric,2) AS wis_var_wa                                  ,
round(bws_var_wa::numeric,2) AS bws_var_wa                                  ,
round(ghrs_wa::numeric,2) AS ghrs_wa                                        ,
round(ps_ll_025_si::numeric,1) AS ps_ll_025_si                              ,
round(ps_ul_975_si::numeric,1) AS ps_ul_975_si                              ,
round(wis_var_si::numeric,2) AS wis_var_si                                  ,
round(bws_var_si::numeric,2) AS bws_var_si                                  ,
round(ghrs_si::numeric,2) AS ghrs_si                                        ,
round(100*ps_ll_025_de::numeric,1) AS ps_ll_025_de                              ,
round(100*ps_ul_975_de::numeric,1) AS ps_ul_975_de                              ,
round(wis_var_de::numeric,2) AS wis_var_de                                  ,
round(bws_var_de::numeric,2) AS bws_var_de                                  ,
round(ghrs_de::numeric,2) AS ghrs_de                                        ,
round(100*ps_ll_025_po::numeric,1) AS ps_ll_025_po                              ,
round(100*ps_ul_975_po::numeric,1) AS ps_ul_975_po                              ,
round(wis_var_po::numeric,2) AS wis_var_po                                  ,
round(bws_var_po::numeric,2) AS bws_var_po                                  ,
round(ghrs_po::numeric,2) AS ghrs_po                                        ,
round(ps_ll_025_pr::numeric,1) AS ps_ll_025_pr                              ,
round(ps_ul_975_pr::numeric,1) AS ps_ul_975_pr                              ,
round(wis_var_pr::numeric,2) AS wis_var_pr                                  ,
round(bws_var_pr::numeric,2) AS bws_var_pr                                  ,
round(ghrs_pr::numeric,2) AS ghrs_pr                                        ,
round(100*ps_ll_025_af::numeric,1) AS ps_ll_025_af                          ,
round(100*ps_ul_975_af::numeric,1) AS ps_ul_975_af                          ,
round(wis_var_af::numeric,2) AS wis_var_af                                  ,
round(bws_var_af::numeric,2) AS bws_var_af                                  ,
round(ghrs_af::numeric,2) AS ghrs_af                                        ,
round(100*ps_ll_025_lw::numeric,1) AS ps_ll_025_lw                          ,
round(100*ps_ul_975_lw::numeric,1) AS ps_ul_975_lw                          ,
round(wis_var_lw::numeric,2) AS wis_var_lw                                  ,
round(bws_var_lw::numeric,2) AS bws_var_lw                                  ,
round(ghrs_lw::numeric,2) AS ghrs_lw                                        ,
round(m_daily_living::numeric,1) AS m_daily_living                                    ,
ps_ll_025_da                                                                 ,
ps_ul_975_da                                                                 ,
round(wis_var_da::numeric,2) AS wis_var_da                                            ,
round(bws_var_da::numeric,2) AS bws_var_da                                  ,
round(ghrs_da::numeric,2) AS ghrs_da                                                 ,
round(z_dl::numeric,2) AS z_dl                                              ,
ps_dl                                                                        ,
round(m_dd::numeric,1) AS m_dd                                              ,
round(ps_ll_025_dd::numeric,1) AS ps_ll_025_dd                              ,
round(ps_ul_975_dd::numeric,1) AS ps_ul_975_dd                              ,
round(wis_var_dd::numeric,2) AS wis_var_dd                                  ,
round(bws_var_dd::numeric,2) AS bws_var_dd                                  ,
round(ghrs_dd::numeric,2) AS ghrs_dd                                        ,
ps_dd                                                                        ,
round(z_dd::numeric,2) AS z_dd                                              ,
round(m_sc::numeric,1) AS m_sc                                              ,
round(ps_ll_025_sc::numeric,1) AS ps_ll_025_sc                              ,
round(ps_ul_975_sc::numeric,1) AS ps_ul_975_sc                              ,
round(wis_var_sc::numeric,2) AS wis_var_sc                                  ,
round(bws_var_sc::numeric,2) AS bws_var_sc                                  ,
round(ghrs_sc::numeric,2) AS ghrs_sc                                        ,
round(z_sc::numeric,2) AS z_sc                                              ,
ps_sc                                                                        ,
gid                                                                          ,
geom
FROM
(SELECT
sa1_7dig11                                             ,
li_ci_est             -100 AS is_li_ci_est             ,
walkability           -100 AS is_walkability           ,
si_mix                -100 AS is_si_mix                ,
dest_pt               -100 AS is_dest_pt               ,
pos15000_access       -100 AS is_pos15000_access       ,
pred_no2_2011_col_ppb -100 AS is_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS is_prop_affordablehousing,
sa2_prop_live_work_sa3     AS is_prop_live_work     
FROM li_mpi_norm_soft_sa1_7dig11) AS t1
LEFT JOIN
(SELECT
sa1_7dig11                                             ,
li_ci_est                  AS rs_li_ci_est             ,
walkability                AS rs_walkability           ,
si_mix                     AS rs_si_mix                ,
dest_pt                    AS rs_dest_pt               ,
pos15000_access            AS rs_pos15000_access       ,
pred_no2_2011_col_ppb      AS rs_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS rs_prop_affordablehousing,
sa2_prop_live_work_sa3     AS rs_prop_live_work        
FROM li_raw_soft_sa1_7dig11) AS t2 
ON t1.sa1_7dig11 = t2.sa1_7dig11
LEFT JOIN
(SELECT
sa1_7dig11                                              ,
li_ci_est                  AS ps_li_ci_est             ,
walkability                AS ps_walkability           ,
si_mix                     AS ps_si_mix                ,
dest_pt                    AS ps_dest_pt               ,
pos15000_access            AS ps_pos15000_access       ,
pred_no2_2011_col_ppb      AS ps_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS ps_prop_affordablehousing,
sa2_prop_live_work_sa3     AS ps_prop_live_work        
FROM li_percentiles_soft_sa1_7dig11) AS t3
ON t1.sa1_7dig11 = t3.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 - 100 AS ps_ll_025_li, p_ul_975  - 100 AS ps_ul_975_li, within_sa1_7dig11_sd AS wis_var_li, between_sa1_7dig11_sd AS bws_var_li, ratio_wi_bw_var AS ghrs_li FROM sa1_7dig11_summary_li_ci_est_soft)                   AS t4  ON t1.sa1_7dig11 = t4.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_wa, p_ul_975  AS ps_ul_975_wa, within_sa1_7dig11_sd AS wis_var_wa, between_sa1_7dig11_sd AS bws_var_wa, ratio_wi_bw_var AS ghrs_wa FROM sa1_7dig11_summary_walkability_raw_soft)                 AS t5  ON t1.sa1_7dig11 = t5.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_si, p_ul_975  AS ps_ul_975_si, within_sa1_7dig11_sd AS wis_var_si, between_sa1_7dig11_sd AS bws_var_si, ratio_wi_bw_var AS ghrs_si FROM sa1_7dig11_summary_si_mix_raw_soft)                      AS t6  ON t1.sa1_7dig11 = t6.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_de, p_ul_975  AS ps_ul_975_de, within_sa1_7dig11_sd AS wis_var_de, between_sa1_7dig11_sd AS bws_var_de, ratio_wi_bw_var AS ghrs_de FROM sa1_7dig11_summary_dest_pt_raw_soft)                     AS t7  ON t1.sa1_7dig11 = t7.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_po, p_ul_975  AS ps_ul_975_po, within_sa1_7dig11_sd AS wis_var_po, between_sa1_7dig11_sd AS bws_var_po, ratio_wi_bw_var AS ghrs_po FROM sa1_7dig11_summary_pos15000_access_raw_soft)             AS t8  ON t1.sa1_7dig11 = t8.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_pr, p_ul_975  AS ps_ul_975_pr, within_sa1_7dig11_sd AS wis_var_pr, between_sa1_7dig11_sd AS bws_var_pr, ratio_wi_bw_var AS ghrs_pr FROM sa1_7dig11_summary_pred_no2_2011_col_ppb_raw_soft)       AS t9  ON t1.sa1_7dig11 = t9.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_af, p_ul_975  AS ps_ul_975_af, within_sa1_7dig11_sd AS wis_var_af, between_sa1_7dig11_sd AS bws_var_af, ratio_wi_bw_var AS ghrs_af FROM sa1_7dig11_summary_sa1_prop_affordablehousing_raw_soft)  AS t10 ON t1.sa1_7dig11 = t10.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,p_ll_025 AS ps_ll_025_lw, p_ul_975  AS ps_ul_975_lw, within_sa1_7dig11_sd AS wis_var_lw, between_sa1_7dig11_sd AS bws_var_lw, ratio_wi_bw_var AS ghrs_lw FROM sa1_7dig11_summary_sa2_prop_live_work_sa3_raw_soft)      AS t11 ON t1.sa1_7dig11 = t11.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,m_daily_living,p_ll_025 AS ps_ll_025_da, p_ul_975 AS ps_ul_975_da, within_sa1_7dig11_sd AS wis_var_da, between_sa1_7dig11_sd AS bws_var_da, ratio_wi_bw_var AS ghrs_da FROM sa1_7dig11_summary_daily_living_raw_soft)                AS t12 ON t1.sa1_7dig11 = t12.sa1_7dig11
LEFT JOIN (SELECT sa1_7dig11,m_dd_nh1600m AS m_dd, p_ll_025 AS ps_ll_025_dd, p_ul_975 AS ps_ul_975_dd, within_sa1_7dig11_sd AS wis_var_dd, between_sa1_7dig11_sd AS bws_var_dd, ratio_wi_bw_var AS ghrs_dd FROM sa1_7dig11_summary_dd_nh1600m_raw) AS t13 ON t1.sa1_7dig11 = t13.sa1_7dig11 
LEFT JOIN (SELECT sa1_7dig11,m_sc_nh1600m AS m_sc, p_ll_025 AS ps_ll_025_sc, p_ul_975 AS ps_ul_975_sc, within_sa1_7dig11_sd AS wis_var_sc, between_sa1_7dig11_sd AS bws_var_sc, ratio_wi_bw_var AS ghrs_sc FROM sa1_7dig11_summary_sc_nh1600m_raw) AS t14 ON t1.sa1_7dig11 = t14.sa1_7dig11
LEFT JOIN 
(SELECT 
abs_linkage.sa1_7dig11,
AVG(z_dl) AS z_dl,
AVG(z_sc) AS z_sc,
AVG(z_dd) AS z_dd,      
ntile(100) OVER(ORDER BY AVG(z_dl)) as ps_dl,
ntile(100) OVER(ORDER BY AVG(z_sc)) as ps_sc,
ntile(100) OVER(ORDER BY AVG(z_dd)) as ps_dd
FROM parcelmb 
LEFT JOIN abs_linkage ON parcelmb.mb_code11 = abs_linkage.mb_code11
LEFT JOIN ind_walkability_soft ON   parcelmb.detail_pid = ind_walkability_soft.detail_pid
GROUP BY sa1_7dig11
ORDER BY sa1_7dig11 ASC) AS t15 ON  t1.sa1_7dig11 = t15.sa1_7dig11
LEFT JOIN sa1_2011_AUST AS t16 ON t1.sa1_7dig11 = t16.sa1_7dig11::numeric
LEFT JOIN sa1_area AS t17 ON t1.sa1_7dig11 = t17.sa1_7dig11;

DROP TABLE IF EXISTS li_map_json_sa1_min_soft;
CREATE TABLE li_map_json_sa1_min_soft AS SELECT row_to_json(fc) FROM 
  (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM 
    (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geom,4326))::json As geometry, 
     row_to_json((
     sa1_7dig11,suburb,lga,is_li_ci_est,rs_walkability,m_daily_living,m_dd,m_sc,rs_si_mix,rs_dest_pt,rs_pos15000_access,rs_pred_no2_2011_col_ppb,rs_prop_affordablehousing,rs_prop_live_work,ps_li_ci_est,ps_walkability,ps_dl,ps_dd,ps_sc,ps_si_mix,ps_dest_pt,ps_pos15000_access,ps_pred_no2_2011_col_ppb,ps_prop_affordablehousing,ps_prop_live_work
     )) As properties FROM 
      (SELECT * FROM li_map_full_soft) As lg) As f) As fc;

      
-- old new Mapping
-- f1  f1  sa1_7dig11            
-- f2  f2  suburb
-- f3  f3  lga
-- f4  f4  ih_li_ci_est                
-- f13 f5  rh_walkability           
-- f68 f6  r_daily_living                               
-- f76 f7  r_dd                                
-- f84 f8  r_sc                                      
-- f14 f9  rh_si_mix                
-- f15 f10 rh_dest_pt               
-- f16 f11 rh_pos15000_access       
-- f17 f12 rh_pred_no2_2011_col_ppb 
-- f18 f13 rh_prop_affordablehousing
-- f19 f14 rh_prop_live_work        
-- f20 f15 ph_li_ci_est             
-- f21 f16 ph_walkability  
-- f75 f17 ph_dl         
-- f82 f18 ph_dd                    
-- f91 f19 ph_sc  
-- f22 f20 ph_si_mix                
-- f23 f21 ph_dest_pt               
-- f24 f22 ph_pos15000_access       
-- f25 f23 ph_pred_no2_2011_col_ppb 
-- f26 f24 ph_prop_affordablehousing
-- f27 f25 ph_prop_live_work


      
      
-- Suburb

DROP TABLE IF EXISTS li_map_full_ssc_soft;
CREATE TABLE li_map_full_ssc_soft AS
SELECT
t1.ssc_name AS suburb                                                                   ,
lga                                                                         ,
round(is_li_ci_est::numeric,1) AS is_li_ci_est                              ,
round(is_walkability::numeric,1) AS is_walkability                          ,
round(is_dl::numeric,1) AS is_dl                        ,
round(is_dd::numeric,1) AS is_dd                                            ,
round(is_sc::numeric,1) AS is_sc                                            ,
round(is_si_mix::numeric,1) AS is_si_mix                                    ,
round(is_dest_pt::numeric,1) AS is_dest_pt                                  ,
round(is_pos15000_access::numeric,1) AS is_pos15000_access                  ,
round(is_pred_no2_2011_col_ppb::numeric,1) AS is_pred_no2_2011_col_ppb      ,
round(is_prop_affordablehousing::numeric,1) AS is_prop_affordablehousing    ,
round(is_prop_live_work::numeric,1) AS is_prop_live_work                    ,
round(rs_li_ci_est::numeric,1) AS rs_li_ci_est                              ,
round(rs_walkability::numeric,1) AS rs_walkability                          ,
round(rs_dl::numeric,1) AS rs_dl                       ,
round(rs_dd::numeric,1) AS rs_dd                                            ,
round(rs_sc::numeric,1) AS rs_sc                                            ,
round(rs_si_mix::numeric,1) AS rs_si_mix                                    ,
round(100*rs_dest_pt::numeric,1) AS rs_dest_pt                              ,
round(100*rs_pos15000_access::numeric,1) AS rs_pos15000_access              ,
round(rs_pred_no2_2011_col_ppb::numeric,1) AS rs_pred_no2_2011_col_ppb      ,
round(100*rs_prop_affordablehousing::numeric,1) AS rs_prop_affordablehousing ,
round(100*rs_prop_live_work::numeric,1) AS rs_prop_live_work                ,
ps_li_ci_est                                                                ,
ps_walkability                                                              ,
ps_dl                                                                        ,
ps_dd                                                                        ,
ps_sc                                                                        ,
ps_si_mix                                                                   ,
ps_dest_pt                                                                  ,
ps_pos15000_access                                                          ,
ps_pred_no2_2011_col_ppb                                                    ,
ps_prop_affordablehousing                                                   ,
ps_prop_live_work                                                           ,
gid                                                                          ,
geom
FROM
(SELECT
ssc_name                                           ,
li_ci_est              -100 AS is_li_ci_est             ,
walkability            -100 AS is_walkability           ,
daily_living           -100 AS is_dl                     ,
dd_nh1600m             -100 AS is_dd                    ,
sc_nh1600m             -100 AS is_sc                    ,
si_mix                 -100 AS is_si_mix                ,
dest_pt                -100 AS is_dest_pt               ,
pos15000_access        -100 AS is_pos15000_access       ,
pred_no2_2011_col_ppb  -100 AS is_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing -100 AS is_prop_affordablehousing,
sa2_prop_live_work_sa3         -100 AS is_prop_live_work        
FROM li_mpi_norm_soft_ssc_name) AS t1
LEFT JOIN
(SELECT
ssc_name                                             ,
li_ci_est                  AS rs_li_ci_est             ,
walkability                AS rs_walkability           ,
daily_living               AS rs_dl                     ,
dd_nh1600m                 AS rs_dd                    ,
sc_nh1600m                 AS rs_sc                    ,
si_mix                     AS rs_si_mix                ,
dest_pt                    AS rs_dest_pt               ,
pos15000_access            AS rs_pos15000_access       ,
pred_no2_2011_col_ppb      AS rs_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS rs_prop_affordablehousing,
sa2_prop_live_work_sa3     AS rs_prop_live_work        
FROM li_raw_soft_ssc_name) AS t2 
ON t1.ssc_name = t2.ssc_name
LEFT JOIN
(SELECT
ssc_name                                              ,
li_ci_est                  AS ps_li_ci_est             ,
walkability                AS ps_walkability           ,
daily_living               AS ps_dl                    ,
dd_nh1600m                 AS ps_dd                    ,
sc_nh1600m                 AS ps_sc                    ,
si_mix                     AS ps_si_mix                ,
dest_pt                    AS ps_dest_pt               ,
pos15000_access            AS ps_pos15000_access       ,
pred_no2_2011_col_ppb      AS ps_pred_no2_2011_col_ppb ,
sa1_prop_affordablehousing AS ps_prop_affordablehousing,
sa2_prop_live_work_sa3     AS ps_prop_live_work        
FROM li_percentiles_soft_ssc_name) AS t3
ON t1.ssc_name  = t3.ssc_name
LEFT JOIN ssc_2011_AUST AS t16 ON t1.ssc_name  = t16.ssc_name
LEFT JOIN ssc_area AS t17 ON t1.ssc_name  = t17.suburb;

DROP TABLE IF EXISTS li_map_json_ssc_min_soft;
CREATE TABLE li_map_json_ssc_min_soft AS SELECT row_to_json(fc) FROM 
  (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM 
    (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geom,4326))::json As geometry, 
     row_to_json((
     '-',suburb,lga,is_li_ci_est,rs_walkability,rs_dl,rs_dd,rs_sc,rs_si_mix,rs_dest_pt,rs_pos15000_access,rs_pred_no2_2011_col_ppb,rs_prop_affordablehousing,rs_prop_live_work,ps_li_ci_est,ps_walkability,ps_dl,ps_dd,ps_sc,ps_si_mix,ps_dest_pt,ps_pos15000_access,ps_pred_no2_2011_col_ppb,ps_prop_affordablehousing,ps_prop_live_work
     )) As properties FROM 
      (SELECT * FROM li_map_full_ssc_soft) As lg) As f) As fc;
      
